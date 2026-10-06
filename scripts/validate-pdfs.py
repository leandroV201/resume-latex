#!/usr/bin/env python3
"""Valida os PDFs do currículo gerados por scripts/build-cv.sh.

Checa, para cada PDF:
  - arquivo PDF válido (cabeçalho, %%EOF, pdfinfo, sem criptografia);
  - fontes embutidas e com mapeamento Unicode (pdffonts);
  - texto extraível (pdftotext), com nome, contato e títulos de seção;
  - acentuação e ligaduras corretas (sem "�", sem "ﬁ", sem "Experi^encia");
E, entre os dois idiomas:
  - mesmos períodos (datas) — PT-BR e EN precisam contar os mesmos fatos.

Usa apenas a biblioteca padrão + poppler-utils (pdfinfo, pdffonts, pdftotext).
No Windows com MiKTeX, os binários miktex-pdf* também são aceitos.

Uso: python scripts/validate-pdfs.py [diretório]   (padrão: output/)
"""
from __future__ import annotations

import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

COMMON_REQUIRED = [
    "Leandro Victtorio Costa Campelo",
    "leandrovicttorio78@gmail.com",
    "linkedin.com/in/leandro-campelo",
    "github.com/leandroV201",
    "NextCompany",
    "Comunicare Solutions",
    "UNINASSAU",
]

DOCS = {
    "pt-br": {
        "file": "leandro-cv-pt-br.pdf",
        # Títulos de seção + palavras com acento/cedilha + palavras com "fi"/"fl".
        "required": [
            "Resumo", "Experiência Profissional", "Projetos", "Formação Acadêmica",
            "Habilidades", "Idiomas", "Desenvolvedor de Software Pleno",
            "Análise e Desenvolvimento de Sistemas", "Inteligência Artificial",
            "Português", "Técnico em Informática", "fiscais", "acessibilidade", "Piauí",
            # "%" sem escape vira comentário no LaTeX e corta o resto da linha.
            "100% dos pagamentos passam por ele",
        ],
    },
    "en": {
        "file": "leandro-cv-en.pdf",
        "required": [
            "Summary", "Experience", "Projects", "Education", "Skills", "Languages",
            "Mid-level Software Developer", "Systems Analysis and Development",
            "Artificial Intelligence", "therapeutic fit", "Piauí",
            "it handles 100% of payments",
        ],
    },
}

# Sinais de extração quebrada: caractere de substituição, ligaduras como
# glifo único (ATS não casa "ﬁscal" com "fiscal") e acentos "soltos" do TeX.
BROKEN_PATTERNS = {
    "caractere de substituição (U+FFFD)": re.compile("�"),
    "ligadura não decomposta (ﬀ/ﬁ/ﬂ…)": re.compile("[ﬀ-ﬆ]"),
    "acento solto (ex.: Experi^encia)": re.compile(r"[a-zA-Z][\^´`~¨][aeiouAEIOU]"),
}

MONTHS = {
    # PT-BR e EN normalizados para o mesmo número de mês.
    "jan": 1, "fev": 2, "feb": 2, "mar": 3, "abr": 4, "apr": 4, "mai": 5,
    "may": 5, "jun": 6, "jul": 7, "ago": 8, "aug": 8, "set": 9, "sep": 9,
    "out": 10, "oct": 10, "nov": 11, "dez": 12, "dec": 12,
}
DATE_RE = re.compile(r"\b([A-Za-z]{3})[a-z]*\.? (\d{4})\b")


def tool(name: str) -> str:
    for candidate in (name, f"miktex-{name}"):
        path = shutil.which(candidate)
        if path:
            return path
    sys.exit(f"ERRO: '{name}' não encontrado. Instale poppler-utils.")


def run(*args: str) -> str:
    result = subprocess.run(args, capture_output=True, text=True, encoding="utf-8")
    if result.returncode != 0:
        raise RuntimeError(f"{Path(args[0]).name} falhou: {result.stderr.strip()}")
    return result.stdout


def dates(text: str) -> list[tuple[int, int]]:
    found = []
    for month, year in DATE_RE.findall(text):
        number = MONTHS.get(month.lower())
        if number:
            found.append((int(year), number))
    return sorted(found)


def check(lang: str, spec: dict, folder: Path) -> tuple[list[str], str]:
    errors: list[str] = []
    pdf = folder / spec["file"]
    if not pdf.is_file():
        return [f"{pdf} não existe"], ""

    data = pdf.read_bytes()
    if not data.startswith(b"%PDF-"):
        errors.append("não começa com %PDF-")
    if b"%%EOF" not in data[-1024:]:
        errors.append("sem marcador %%EOF no final (arquivo truncado?)")

    try:
        info = run(tool("pdfinfo"), str(pdf))
        pages = int(re.search(r"^Pages:\s+(\d+)", info, re.M).group(1))
        if pages < 1:
            errors.append("PDF sem páginas")
        if re.search(r"^Encrypted:\s+yes", info, re.M):
            errors.append("PDF criptografado (ATS podem não ler)")
    except (RuntimeError, AttributeError) as exc:
        errors.append(f"pdfinfo: {exc}")
        pages = 0

    try:
        fonts = run(tool("pdffonts"), str(pdf)).splitlines()[2:]
        for line in fonts:
            cols = line.split()
            # Colunas finais: emb sub uni objID gen
            emb, uni = cols[-5], cols[-3]
            if emb != "yes":
                errors.append(f"fonte não embutida: {cols[0]}")
            if uni != "yes":
                errors.append(f"fonte sem mapa Unicode: {cols[0]}")
            if "Type 3" in line:
                errors.append(f"fonte bitmap (Type 3): {cols[0]}")
    except RuntimeError as exc:
        errors.append(f"pdffonts: {exc}")

    text = run(tool("pdftotext"), "-enc", "UTF-8", str(pdf), "-")
    words = len(text.split())
    if words < 150:
        errors.append(f"pouco texto extraído ({words} palavras): PDF pode ser imagem")

    # Frases podem quebrar entre linhas na extração: compara com espaços normalizados.
    flat = " ".join(text.split())
    for needle in COMMON_REQUIRED + spec["required"]:
        if needle not in flat:
            errors.append(f"texto ausente na extração: {needle!r}")

    for label, pattern in BROKEN_PATTERNS.items():
        hit = pattern.search(text)
        if hit:
            snippet = text[max(0, hit.start() - 20): hit.end() + 20].replace("\n", " ")
            errors.append(f"{label}: ...{snippet}...")

    status = "OK" if not errors else "FALHOU"
    print(f"[{status}] {lang}: {pdf.name} — {pages} página(s), {words} palavras")
    return errors, text


def main() -> int:
    sys.stdout.reconfigure(encoding="utf-8")
    folder = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "output"
    failed = False
    texts = {}
    for lang, spec in DOCS.items():
        errors, texts[lang] = check(lang, spec, folder)
        for err in errors:
            print(f"    - {err}")
        failed |= bool(errors)

    if all(texts.values()):
        pt, en = dates(texts["pt-br"]), dates(texts["en"])
        if pt != en:
            failed = True
            print("[FALHOU] datas divergentes entre PT-BR e EN:")
            print(f"    pt-br: {pt}\n    en:    {en}")
        else:
            print(f"[OK] PT-BR e EN têm os mesmos {len(pt)} marcos de data")

    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())

#!/usr/bin/env bash
# Compila o CV PT-BR e o EN e gera:
#   output/leandro-cv-pt-br.pdf
#   output/leandro-cv-en.pdf
# Falha (exit != 0) se qualquer compilação tiver erro.
#
# output/ é só saída de build: tudo que estiver lá é apagado antes de compilar,
# para não sobrar PDF/DOCX de versões antigas do currículo.
#
# Uso: scripts/build-cv.sh [diretório extra para copiar os PDFs]
#   ex.: scripts/build-cv.sh portfolio/public/cv
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD="$ROOT/build"
OUT="$ROOT/output"
EXTRA_DEST="${1:-}"

echo "==> Limpando output/"
mkdir -p "$BUILD" "$OUT"
find "${OUT:?}" -mindepth 1 -maxdepth 1 -exec rm -rf -- {} +

build() {
  local lang="$1" name="$2"
  echo "==> Compilando $lang"
  # Compila de dentro da pasta do idioma: os \input usam caminhos relativos a ela.
  (
    cd "$ROOT/$lang"
    latexmk -pdf -interaction=nonstopmode -halt-on-error -file-line-error \
      -outdir="$BUILD/$lang" resume.tex
  )
  cp "$BUILD/$lang/resume.pdf" "$OUT/$name"
  echo "    -> output/$name"
}

build pt-br leandro-cv-pt-br.pdf
build en leandro-cv-en.pdf

if [[ -n "$EXTRA_DEST" ]]; then
  mkdir -p "$EXTRA_DEST"
  # Só PDFs: o destino pode ter outros arquivos que não são deste script.
  find "${EXTRA_DEST:?}" -maxdepth 1 -type f -name '*.pdf' -delete
  cp "$OUT/leandro-cv-pt-br.pdf" "$OUT/leandro-cv-en.pdf" "$EXTRA_DEST/"
  echo "==> PDFs copiados para $EXTRA_DEST"
fi

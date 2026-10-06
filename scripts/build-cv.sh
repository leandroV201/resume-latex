#!/usr/bin/env bash
# Compila o CV PT-BR e o EN e gera:
#   output/leandro-cv-pt-br.pdf
#   output/leandro-cv-en.pdf
# Falha (exit != 0) se qualquer compilação tiver erro.
#
# Uso: scripts/build-cv.sh [diretório extra para copiar os PDFs]
#   ex.: scripts/build-cv.sh portfolio/public/cv
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD="$ROOT/build"
OUT="$ROOT/output"
EXTRA_DEST="${1:-}"

mkdir -p "$BUILD" "$OUT"

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
  cp "$OUT/leandro-cv-pt-br.pdf" "$OUT/leandro-cv-en.pdf" "$EXTRA_DEST/"
  echo "==> PDFs copiados para $EXTRA_DEST"
fi

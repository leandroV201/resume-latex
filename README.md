# Resume LaTeX + Portfolio

Currículo profissional em **LaTeX** (PT-BR e EN) e portfolio pessoal em **Angular**, publicados juntos no GitHub Pages.

- Portfolio: `https://leandrov201.github.io/resume-latex/`
- CVs: `…/cv/leandro-cv-pt-br.pdf` e `…/cv/leandro-cv-en.pdf`

## Estrutura

```text
templates/preamble.tex     layout compartilhado dos dois CVs
pt-br/  resume.tex         CV em português (seções em pt-br/sections/)
en/     resume.tex         CV em inglês    (seções em en/sections/)
scripts/build-cv.sh        compila os dois CVs → output/leandro-cv-*.pdf
scripts/validate-pdfs.py   valida os PDFs (ATS, acentos, fontes, datas PT x EN)
portfolio/                 site Angular (PT-BR / EN)
  src/app/content/facts.ts fatos neutros de idioma: datas, links, tecnologias
  src/app/content/pt-br.ts textos em português
  src/app/content/en.ts    textos em inglês (mesma interface: chave faltando quebra o build)
.github/workflows/         CI: CVs → validação → Angular → GitHub Pages
```

PT-BR e EN contam **os mesmos fatos**. Ao mudar uma experiência, atualize:
1. `pt-br/sections/*.tex` e `en/sections/*.tex`;
2. `portfolio/src/app/content/facts.ts` (datas, tecnologias) e os textos em `pt-br.ts` / `en.ts`.

O validador de PDFs reprova o build se as datas do CV PT-BR e do EN divergirem, e um teste do portfolio
reprova se as duas versões tiverem quantidades diferentes de itens.

`output/` e `build/` são só saída de build e não vão para o Git: `build-cv.sh` esvazia `output/` antes de
compilar (nenhum PDF/DOCX antigo sobra) e o CI falha se algum arquivo gerado for versionado.

## Rodar localmente

Requisitos: TeX Live ou MiKTeX (com `latexmk`), poppler (`pdftotext`, `pdfinfo`, `pdffonts`), Python 3 e Node 24.

```bash
# CVs (gera output/ e copia para o portfolio)
bash scripts/build-cv.sh portfolio/public/cv
python scripts/validate-pdfs.py

# Portfolio
cd portfolio
npm ci
npm start            # http://localhost:4200
npm run test:ci
```

> No Git Bash (Windows), use `MSYS_NO_PATHCONV=1 npx ng build --base-href /resume-latex/`: sem isso o
> Git Bash converte `/resume-latex/` em um caminho do Windows.

## Deploy

Cada push na `main` dispara o workflow `CV e portfolio`:

1. compila o CV PT-BR e o EN (falha em qualquer erro de LaTeX);
2. valida os PDFs: estrutura, fontes embutidas com Unicode, texto extraível, acentos, ligaduras e datas PT x EN;
3. roda os testes e o build do Angular com os PDFs em `cv/`;
4. publica no GitHub Pages, **somente se tudo acima passar**.

Configuração única no GitHub: *Settings → Pages → Build and deployment → Source: **GitHub Actions***.

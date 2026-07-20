# Pedale Mais Forte — Landing Page

Página de vendas estática (HTML + JS puro, sem build step). Pronta para deploy direto no GitHub Pages, Vercel ou Netlify.

## Estrutura

```
index.html      página completa (hero, blocos 1–12, oferta, FAQ, fechamento)
support.js      runtime que renderiza o template (carrega React via CDN em runtime)
assets/         imagens usadas na página
  hero.png            foto da roda — hero
  virada.png          bikes/barracas ao amanhecer — bloco "A Virada"
  qualificacao.png    grupo pedalando — bloco "Para quem é"
  cume.png            bike no cume — bloco de fechamento
```

## Deploy no Vercel

1. Suba esta pasta para um repositório no GitHub.
2. Em vercel.com → New Project → importe o repositório.
3. Framework preset: **Other** (site estático). Build command: nenhum. Output directory: raiz (`.`).
4. Deploy.

Também funciona em GitHub Pages (ative Pages apontando para a branch/raiz) ou arrastando a pasta em Netlify Drop.

## Editando conteúdo

- Textos, preços e link de checkout (Kiwify) estão no próprio `index.html`.
- Procure por `kiwifyLink`, `installments` e `installmentValue` no final do arquivo (dentro do `<script>`) para trocar o link de pagamento e as condições de parcelamento.
- Para ativar a seção de depoimentos (atualmente oculta com placeholders), troque `showTestimonials` para `true` e substitua os prints de exemplo pelos reais.

## Notas técnicas

- Sem dependências externas além de Google Fonts e React/ReactDOM (carregados via CDN pelo `support.js`).
- Respeita `prefers-reduced-motion` (desliga parallax, contagens e reveals animados).
- CTA fixo mobile, linha de progresso lateral e efeitos de mouse-parallax no hero/imagens já incluídos.

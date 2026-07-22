# Pedale Mais Forte Depois dos 40 — Landing Page

Página de vendas estática (HTML + JS puro, sem build step). Pronta para deploy direto no GitHub Pages, Vercel ou Netlify.

## Estrutura

```
index.html      página completa (navbar + sidebar mobile, hero, blocos 1–12, carrossel de mockups, oferta, FAQ, fechamento)
support.js      runtime que renderiza o template (carrega React via CDN em runtime)
assets/         imagens usadas na página
  hero.png          roda de bike em contraluz — hero
  virada.png        bikes/barracas ao amanhecer — bloco "A Virada"
  cume.png          bike no cume — bloco de fechamento
  mockup-1.jpeg     e-book em tablet/notebook/celular — carrossel
  mockup-2.jpeg     capa empilhada sobre livros — carrossel + og:image
  mockup-3.jpeg     e-book aberto em tablet — carrossel
  mockup-4.jpeg     e-book aberto em celular — carrossel
  autor.webp        foto do autor João Almeida — bloco "Sobre o autor"
```

## Deploy no Vercel

1. Suba esta pasta para um repositório no GitHub.
2. Em vercel.com → New Project → importe o repositório.
3. Framework preset: **Other** (site estático). Build command: nenhum. Output directory: raiz (`.`).
4. Deploy.

Também funciona em GitHub Pages (ative Pages apontando para a branch/raiz) ou arrastando a pasta em Netlify Drop.

## Editando conteúdo

- Textos, preços e link de checkout (Kiwify) estão no próprio `index.html`.
- Procure por `kiwifyLink` no final do arquivo (dentro do `<script>`) para trocar o link de pagamento.
- Para ativar a seção de depoimentos (atualmente oculta com placeholders "PRINT REAL AQUI"), troque `showTestimonials` para `true` e substitua os prints de exemplo pelos reais.
- O Meta Pixel já está configurado no `<head>` (evento `PageView` automático + `InitiateCheckout` em todos os CTAs que levam ao checkout).

## Funcionalidades incluídas

- Navbar fixa e super-slim, transparente sobre o hero, sólida ao rolar; menu de seções no desktop e sidebar deslizante no mobile (hambúrguer).
- Hero fullbleed com imagem em contraluz, sem card sobre o texto.
- CTA fixo (sticky) no mobile, com trava de scroll quando a sidebar está aberta.
- Barra de progresso de leitura no topo.
- Reveals ao rolar, tilt 3D nos cards de credibilidade (desktop), carrossel infinito de mockups (pausa no hover), microanimações na oferta (cascata de preços + faíscas no valor final).
- Tudo respeita `prefers-reduced-motion` (desliga parallax, tilt, faíscas e reveals animados).
- `loading="lazy"` em imagens abaixo da dobra e preload da imagem do hero para carregamento rápido.

## Notas técnicas

- Sem dependências externas além de Google Fonts e React/ReactDOM (carregados via CDN pelo `support.js`).
- Nenhuma lib de smooth-scroll — scroll 100% nativo.

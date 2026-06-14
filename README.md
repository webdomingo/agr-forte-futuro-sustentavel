# Agro Forte, Futuro Sustentável

Projeto desenvolvido para o **Agrinho 2026**, com o tema *"Agro Forte, Futuro Sustentável"*. A proposta é mostrar, através de uma experiência interativa na web, que produção agrícola e meio ambiente não são opostos — são dois lados do mesmo ser, que crescem juntos quando há equilíbrio. O site percorre essa ideia desde a relação entre o agro e a terra até o papel do agronegócio paranaense, fechando com uma seção interativa que convida o visitante a refletir sobre seu próprio papel nesse equilíbrio.

## Sobre o Agrinho

O Agrinho é um programa socioeducativo que leva estudantes de escolas públicas e privadas a produzir trabalhos artísticos e textuais sobre temas relevantes para a sociedade, incentivando a reflexão desde a infância. Cada edição traz um tema norteador — em 2026, *"Agro Forte, Futuro Sustentável"* propõe pensar sobre a relação entre desenvolvimento do agronegócio e responsabilidade ambiental.

## Objetivo

Apresentar de forma visual e acessível como tecnologia, produtividade e preservação ambiental podem caminhar juntas no campo, com foco no Paraná — estado que é referência nacional em agronegócio sustentável. O site combina texto, ilustrações em SVG, animações e um mini-jogo educativo para tornar o tema mais envolvente do que um texto tradicional.

## Design

O design segue uma linha **mobile-first**, com tipografia que mistura uma serifada elegante (*Playfair Display*) para títulos com uma sans-serif limpa (*DM Sans*) para o corpo do texto, reforçando o contraste entre a tradição do campo e a modernidade da tecnologia agrícola.

A paleta de cores é inspirada na paisagem rural: verdes profundos de floresta, tons de terra e âmbar do sol, com detalhes em verde-claro como cor de destaque. O site possui dois temas, claro e escuro, com uma variável de destaque (`--destaque`) que se adapta automaticamente para manter um bom contraste em ambos.

Entre os elementos visuais estão:

- Paisagem animada em SVG no topo (hero), com sol, montanhas e rio.
- Cursor customizado (em telas com mouse).
- Barra de progresso de leitura no topo da página.
- Animações de entrada ao rolar a página (`IntersectionObserver`).
- Mapa interativo das mesorregiões do Paraná, em SVG.
- Mini-jogo de plantio, com sistema de recursos (água, sol, solo).

### Decisões de design

O cursor customizado, as animações de entrada e os pequenos efeitos de movimento (sol pulsando, partículas, linhas desenhando-se) foram pensados para dar uma sensação de "vida" à página — como se o site fosse um pequeno ecossistema em constante movimento, reforçando visualmente o próprio tema do projeto. Ao mesmo tempo, sabendo que isso pode incomodar algumas pessoas ou prejudicar a leitura, todas essas animações podem ser desativadas pelo painel de acessibilidade, priorizando sempre que o conteúdo continue acessível mesmo com o "modo reduzido" ativado.

## Tecnologias utilizadas

- **HTML5** semântico, com atenção a acessibilidade (`aria-label`, `role`, skip link, etc.)
- **CSS3** puro, sem frameworks — variáveis CSS (`:root`), Grid e Flexbox, animações com `@keyframes`
- **JavaScript** vanilla (sem bibliotecas), responsável por:
  - alternância de tema claro/escuro
  - painel de acessibilidade (tamanho de fonte, alto contraste, redução de movimento)
  - menu de navegação e versão mobile
  - animações ativadas por scroll
  - mapa interativo do Paraná
  - lógica do mini-jogo educativo
- **Google Fonts** (Playfair Display + DM Sans)

## Estrutura do projeto

```
.
├── index.html      # estrutura e conteúdo de todas as seções
├── style.css       # estilos, temas (claro/escuro), responsividade e animações
└── script.js       # interatividade: acessibilidade, navegação, mapa, jogo, animações
```

## Seções do site

| Seção | Conteúdo |
|---|---|
| **Hero** | Apresentação do tema com paisagem animada |
| **A Terra Fala** | Introdução à relação entre produção e meio ambiente |
| **Equilíbrio** | Comparativo entre produção e natureza, lado a lado |
| **Tecnologia** | Inovações do agro que respeitam o meio ambiente |
| **Paraná** | Dados e destaques do agronegócio paranaense |
| **Mapa PR** | Mapa interativo das regiões do estado |
| **Vozes do Campo** | Depoimentos sobre o equilíbrio no campo |
| **Você Faz Parte** | Linha do tempo de ações que cada pessoa pode tomar |
| **Jogo** | Mini-jogo educativo sobre o ciclo de uma plantação sustentável |

## Responsividade

O layout foi construído com mobile-first como princípio: o ponto de partida do CSS é a tela pequena, com media queries ampliando o layout (grids, espaçamentos e tamanhos de fonte) conforme a tela cresce. Isso garante que a experiência em celulares — provavelmente o dispositivo mais usado para acessar o site — seja tão cuidada quanto em telas grandes, sem elementos cortados ou ilegíveis.

## Acessibilidade

O site inclui um painel de acessibilidade com:

- alternância entre modo claro e escuro
- ajuste do tamanho da fonte
- modo de alto contraste
- redução de animações

## Fontes

Os dados e números apresentados sobre produtividade, área reflorestada e agronegócio paranaense têm caráter ilustrativo/educativo para fins do projeto. Para dados oficiais e atualizados, recomenda-se consultar fontes como IBGE, EMBRAPA e a Secretaria de Estado da Agricultura e do Abastecimento do Paraná (SEAB).

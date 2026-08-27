# camuss0.dev — source code

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | [Astro](https://astro.build/) 6.3 |
| CSS | [Tailwind CSS](https://tailwindcss.com/) v4 |
| TypeScript | 6.0 (strict) |
| Deploy estático | [Cloudflare Pages](https://pages.cloudflare.com/) |
| Contact form | [Cloudflare Worker](https://developers.cloudflare.com/workers/) + [Email Routing](https://developers.cloudflare.com/email-routing/) |
| Fonts | Inter + JetBrains Mono (Google Fonts CDN) |

## Arquitectura

- **Sitio estático**: Astro genera HTML puro en `dist/`, desplegado en Cloudflare Pages. Sin SSR, sin lógica del lado del servidor.
- **Contact form**: Cloudflare Worker separado (`portfolio-contact-form`) que recibe POSTs en `/api/contact`, aplica rate limiting (3 req/15min por IP), y envía emails via Cloudflare Email Routing.
- **i18n**: Client-side. Dos bloques HTML pre-renderizados (es/en) con toggle por `localStorage`. Sin dependencias externas.
- **Contenido**: JSON data files (`data/data_es.json`, `data/data_en.json`) leídos en build time via `fs.readFileSync`.

## Estructura del proyecto

```
├── data/
│   ├── data_en.json              # Contenido en inglés
│   └── data_es.json              # Contenido en español
├── public/
│   ├── CV.pdf / Resume.pdf       # Descargables
│   ├── icons/                    # 45 iconos del stack tecnológico
│   └── images/                   # Screenshots de proyectos, logos, fotos
├── src/
│   ├── components/
│   │   ├── home/                 # Hero, proyectos, skills, contacto
│   │   ├── layout/               # Header, Footer, Layout
│   │   ├── projects/             # Carousel, Modal, ProjectMeta
│   │   └── ui/                   # Badge, Tag, Modal, SectionHeading
│   ├── i18n/ui.ts                # Traducciones es/en (~55 keys)
│   ├── pages/index.astro         # Single page entry point
│   ├── styles/global.css         # Tailwind v4 theme, scroll reveals, animaciones
│   ├── types/data.ts             # TypeScript interfaces
│   └── utils/                    # Icon mapping, image helpers
├── workers/
│   └── contact-form/
│       ├── src/index.js          # Cloudflare Worker
│       └── wrangler.toml         # Config de deploy
├── astro.config.mjs
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

## Desarrollo local

```bash
pnpm install
pnpm run dev
```

## Deploy

```bash
# Sitio estático
pnpm run build
# → output en dist/

# Contact form worker
cd workers/contact-form
npx wrangler deploy --env production
```

## Licencia

[MIT](LICENSE)

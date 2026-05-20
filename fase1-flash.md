# Fase 1 — Flash

## Objetivo

Dejar funcionando el portfolio en versión básica funcional: carga desde `data.json`, renderiza toda la información, permite navegar la experiencia completa, y sirve como base estructural estable para la Fase 2 de diseño.

## Alcance

- Sitio estático Astro + Tailwind CSS v4
- Lectura de `data.json` como fuente única de contenido
- Homepage con hero, proyectos, skills, y footer mínimo
- Sistema de modales/overlays para detalle de proyecto
- Soporte preparado para imágenes y galerías (aunque los assets aún no existan)
- Estructura de componentes limpia y mantenible
- Navegación funcional
- Responsive funcional (sin diseño refinado)
- Cero diseño avanzado. Solo layout funcional.

## Principios

1. **JSON-driven**: todo contenido relevante se lee de `data.json`. No hay hardcoding de texto en componentes.
2. **Componentes atómicos**: cada pieza de UI es un componente Astro independiente.
3. **Tipado**: interfaces TypeScript para la forma de los datos.
4. **Imágenes diferidas**: la arquitectura asume imágenes futuras sin que su ausencia actual rompa nada.
5. **Sin estado global complejo**: basta con props drilling + un store mínimo para el modal.
6. **Tailwind utility-first**: sin CSS custom salvo variables de tema.

## Arquitectura de implementación

```
src/
  types/
    data.ts            # Interfaces TypeScript para data.json
  data/
    data.json          # Copia o symlink del data.json raíz (o import directo)
  components/
    layout/
      Header.astro
      Footer.astro
      Layout.astro     # Wrapper con slot + metadatos base
    home/
      Hero.astro
      ProjectsSection.astro
      ProjectCard.astro
      SkillsSection.astro
    projects/
      ProjectModal.astro
      ProjectGallery.astro
      ProjectMeta.astro
    ui/
      Modal.astro       # Overlay genérico reutilizable
      Tag.astro
      Badge.astro
      SectionHeading.astro
  pages/
    index.astro         # Homepage (única página)
  utils/
    images.ts           # Helpers para rutas de imágenes
public/
  images/
    projects/           # Estructura preparada: {project-id}/
    personal/           # Foto del hero
```

### Flujo de datos

1. `index.astro` importa `data.json` en el frontmatter.
2. El JSON se tipa con las interfaces de `types/data.ts`.
3. Los datos se pasan como props a cada componente de sección.
4. Cada proyecto recibe su objeto completo; el modal recibe el `id` y busca el proyecto en el array.
5. Las rutas de imágenes se resuelven con `utils/images.ts` → si el archivo no existe, se muestra un placeholder gris o nada. Nunca un 404 roto.

### Transformaciones necesarias del JSON para el frontend

- `personal.design_preferences` → solo se usa en Fase 2. No se renderiza.
- `personal.personality_traits` → no se renderiza directamente. Se usa solo si Fase 2 lo requiere.
- `projects[].visibility` → todos son `"private"`. El campo se ignora en renderizado pero se mantiene en el tipo.
- `projects[].tech_stack` → algunos arrays están vacíos. El componente debe manejar el caso vacío (no mostrar la sección o mostrar "—").
- `projects[].integrations`, `infrastructure`, `database`, `deployment` → ídem. Solo renderizar si hay datos.
- `projects[].automation_or_ai_usage` → solo un proyecto lo tiene. Renderizar condicionalmente.
- `projects[].architecture_notes` → mostrar como lista en el modal.
- `projects[].engineering_challenges` → ídem.
- `projects[].future_ideas` → solo si tiene contenido.
- `projects[].key_features` → todos tienen. Renderizar como tags/badges compactos.
- `projects[].screenshots_available` → booleano. Si es `true`, intentar cargar galería. Si no hay archivos aún, no mostrar error.
- `projects[].highlight` → todos son `true`. En Fase 2 se usará para distinguir visualmente. En Fase 1, renderizar todos igual.
- `skills` → agrupar por categoría. Cada categoría como una fila de tags.
- `experience` → un solo entry. Mostrar como bloque de texto + lista de skills.

## Componentes — Detalle funcional

### Header.astro
- Nombre del portfolio (fijo: "Camuss0")
- Nav con anclas: `#projects`, `#skills`
- Fondo sólido oscuro, sin transparencias ni blur en Fase 1
- Sticky al top

### Hero.astro
- Dos columnas en desktop: texto izq / placeholder imagen der
- Imagen: placeholder gris con texto "Photo" hasta que exista el asset
- Statement corto extraído de `personal.short_bio`
- Subtítulo con `personal.role` y `personal.location`
- Tags de `personal.specialties` en fila
- Altura contenida, sin scroll excesivo

### ProjectsSection.astro
- Título de sección
- Grid simple: 1 columna mobile, 2 columnas tablet, 3 columnas desktop
- Cada project card muestra: nombre, tipo, short_description
- Click en card → abre ProjectModal

### ProjectCard.astro
- Recibe el objeto proyecto completo
- Muestra nombre, tipo (badge), short_description
- Si `screenshots_available` es true, mostrar un área de placeholder para thumbnail futuro
- Cursor pointer
- `data-project-id` como atributo para el handler del modal

### SkillsSection.astro
- Recibe `skills` del JSON
- Renderiza cada categoría como grupo: título de categoría + tags
- Sin íconos en Fase 1 (se agregarán en Fase 2 si aportan)

### Modal.astro (ui/)
- Overlay full-screen con fondo semitransparente
- Contenedor centrado con scroll interno
- Botón de cierre (X)
- Cierre con Escape y click fuera del contenido
- Slot para contenido dinámico
- Manejo de body scroll lock

### ProjectModal.astro
- Recibe el proyecto completo (buscado por id desde el store)
- Secciones en orden:
  1. Nombre del proyecto + tipo + status
  2. Short description (más destacado que en la card)
  3. Full description
  4. Problem solved
  5. Key features (tags)
  6. Technical overview
  7. Architecture notes (lista)
  8. Engineering challenges (lista)
  9. Tech stack (tags)
  10. Integrations (si existen)
  11. Automation / AI usage (si existe)
  12. Design notes (si existen)
  13. Future ideas (si existen)
  14. Gallery (si screenshots_available)
- Cada sección solo se renderiza si tiene contenido
- Navegación prev/next entre proyectos (opcional en Fase 1, baja prioridad)

### ProjectGallery.astro
- Recibe `projectId`
- Intenta cargar imágenes desde `public/images/projects/{projectId}/`
- Si no hay imágenes, no renderiza nada
- Grid simple de imágenes
- Click en imagen → lightbox básico o expandir

### Footer.astro
- Mínimo: ubicación, año, dominio
- Sin links sociales por ahora (no están en el JSON)

## Estrategia para imágenes futuras

1. Las imágenes vivirán en `public/images/projects/{project-id}/` y `public/images/personal/`.
2. El helper `utils/images.ts` exporta funciones:
   - `getProjectImagePath(projectId: string, filename?: string): string`
   - `getHeroImagePath(): string`
   - `imageExists(path: string): boolean` (en Fase 1 siempre false, mock)
3. Todo componente que use imágenes acepta un fallback visual (placeholder).
4. No se usa `import` de imágenes. Se usan rutas relativas a `public/`.
5. En `data.json` se agregará a futuro un campo `images: string[]` por proyecto con los nombres de archivo. Mientras tanto, el componente ProjectGallery asume una convención de nombres (`01.webp`, `02.webp`, etc.) y falla silenciosamente si no existen.

## Mecanismo del modal

- Estado: un `signal` o store simple (`currentProjectId: string | null`).
- Al hacer click en ProjectCard → se setea el id.
- El Modal se monta/desmonta según si hay id.
- ProjectModal busca el proyecto en el array por id.
- Cierre: click en X, click en overlay, tecla Escape → setea id a null.
- Scroll lock: `document.body.style.overflow = 'hidden'` al abrir, restaurar al cerrar.

## Orden de implementación

1. **Tipos** (`types/data.ts`): definir interfaces para todo el JSON.
2. **Utils** (`utils/images.ts`): helpers de rutas de imágenes con fallbacks.
3. **Layout base** (`Layout.astro`, `Header.astro`, `Footer.astro`): estructura HTML, meta tags, nav.
4. **UI primitivos** (`Modal.astro`, `Tag.astro`, `Badge.astro`, `SectionHeading.astro`): componentes reutilizables.
5. **Hero** (`Hero.astro`): foto placeholder + statement + specialties.
6. **ProjectCard** (`ProjectCard.astro`): card individual con datos básicos.
7. **ProjectsSection** (`ProjectsSection.astro`): grid de cards + lógica de click → modal.
8. **ProjectGallery** (`ProjectGallery.astro`): galería condicional.
9. **ProjectMeta** (`ProjectMeta.astro`): secciones de detalle (key features, tech stack, etc.).
10. **ProjectModal** (`ProjectModal.astro`): composición completa del detalle de proyecto.
11. **SkillsSection** (`SkillsSection.astro`): categorías + tags.
12. **Página principal** (`index.astro`): ensamblar todas las secciones.
13. **Mecanismo del modal**: integrar store, handlers, scroll lock.
14. **Revisión final**: verificar que todos los campos se renderizan condicionalmente, que los arrays vacíos no rompen nada, y que el sitio carga sin errores.

## Criterios de "listo" para Fase 1

- [ ] El sitio carga en `localhost` sin errores de build.
- [ ] Todo el contenido visible proviene de `data.json`.
- [ ] El header tiene navegación funcional con anclas.
- [ ] El hero muestra nombre, role, location, specialties, y placeholder de foto.
- [ ] La sección de proyectos muestra 5 cards en grid responsive.
- [ ] Cada card muestra nombre, tipo, short_description.
- [ ] Al hacer click en una card, se abre el modal con el detalle completo del proyecto.
- [ ] El modal muestra solo las secciones con datos (no renderiza secciones vacías).
- [ ] El modal cierra con X, overlay click, y tecla Escape.
- [ ] El body no scrollea mientras el modal está abierto.
- [ ] La galería de screenshots no muestra nada si no hay archivos (no genera errores).
- [ ] La sección de skills muestra todas las categorías con tags.
- [ ] El footer muestra ubicación y año.
- [ ] No hayCSS custom más allá de lo que Tailwind no cubra (variables de color si hacen falta).
- [ ] El sitio es responsive (mobile, tablet, desktop) aunque sin diseño refinado.
- [ ] No hay texto hardcodeado en componentes (todo viene de props o del JSON).
- [ ] `astro build` completa sin errores.

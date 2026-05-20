Eres Kimi K 2.6 actuando como diseñador/implementador senior de un portfolio personal premium en Astro + Tailwind CSS v4.

Tu tarea es MODIFICAR el proyecto existente y generar el código necesario para llevar la Fase 2 a un nivel visual WOW, manteniendo la base funcional ya hecha en Fase 1.

Quiero que trabajes sobre una web ya existente que:
- usa Astro
- usa Tailwind CSS v4
- carga contenido desde `data.json`
- es single-page
- tiene modal/overlay para proyectos
- tendrá imágenes en `public/images/`
- debe ser dark, editorial, técnica, cinematográfica y premium

NO quiero una landing genérica.
NO quiero una plantilla SaaS.
NO quiero una UI plana ni conservadora.
NO quiero que priorices seguridad visual.
Quiero una web memorable, con criterio y creatividad real.

Tu objetivo es implementar un diseño profesional con momentos WOW, sin perder legibilidad ni sensación técnica.

CONTEXTO DE MARCA
- Marca visible: Valentin Camusso
- Dominio: camuss0.dev
- Perfil: desarrollador técnico, builder-oriented, enfocado en productos reales, sistemas, automatización, integraciones, backend lógico, mobile, realtime, GPS, offline sync, AI-assisted development
- El foco de la homepage son los proyectos

CONTENIDO DISPONIBLE
El sitio consume `data.json` con esta estructura general:
- personal
- projects[]
- experience[]
- skills
- portfolio_direction

El JSON actual todavía no tiene referencias de imágenes, pero eso se irá agregando luego en `public/images/`.
Tu implementación debe contemplar eso desde ya.

LO QUE QUIERO VER EN LA PÁGINA

1) HERO
- nombre grande
- statement corto y fuerte
- role/location
- foto profesional limpia
- specialties visibles abajo en una cinta marquee horizontal de izquierda a derecha
- header/navbar visible con botones centrados
- selector de idioma visible aunque todavía no funcione
- fondo de puntitos blancos que reaccionan al mouse alejándose suavemente
- sensación de profundidad, no adorno barato

2) PROJECTS
- son el centro del portfolio
- deben verse curados, no cronológicos
- alternar layouts para evitar monotonía
- una vez imagen izquierda / texto derecha, luego al revés, y seguir variando
- reveals más impactantes
- entradas desde los costados
- sensación cinematográfica al hacer scroll
- cada proyecto debe sentirse distinto
- si hay imágenes, integrarlas con intención visual
- si no hay imágenes, el layout igual debe verse sólido

3) STUDIES
- sección ligera, breve y elegante
- solo soporte de credibilidad
- no debe competir con proyectos

4) EXPERIENCE / SKILLS
- tratarlo como soporte secundario
- limpio, compacto, sin ruido
- sin barras de progreso, sin métricas fake, sin decoración innecesaria

5) MODAL DE PROYECTO
- abrir con sensación premium
- mostrar descripción técnica completa
- soportar galería si hay imágenes
- hacer que el reveal del modal sea notable
- detalle técnico claro y bien jerarquizado
- no usar una ventana genérica

REGLAS DE DISEÑO

Quiero:
- dark theme
- tipografía limpia y moderna
- composición editorial
- motion elegante
- profundidad
- espaciado con intención
- jerarquía fuerte
- alternancia visual real
- sensación de producto cuidado

Quiero permisos creativos para:
- backgrounds atmosféricos
- motion sutil pero memorable
- transiciones más expresivas
- composiciones asimétricas cuando aporten
- microinteracciones refinadas
- una estética con presencia

Evitar solo esto:
- templates obvios
- repetición mecánica
- glow barato
- glassmorphism cliché
- neón gratuito
- layout plano
- simetría artificial en todo
- UI genérica de startup
- “slop” visual
- creatividad sin legibilidad

IMPORTANTE
- No agregues contenido inventado.
- No inventes métricas, testimonios, logos, empresas ni datos que no estén en `data.json`.
- Sí puedes proponer estructuras visuales y componentes nuevos.
- Sí puedes crear animaciones, fondos, reveals, layout alternado y componentes para que la web tenga personalidad.
- Sí puedes preparar el código para que luego entren íconos de tecnologías sin romper nada.
- Sí puedes dejar preparado el selector de idioma aunque no tenga lógica final todavía.

TAREA CONCRETA
Implementa la Fase 2 en el proyecto existente.
Quiero que entregues código real, no solo explicación.

Prioridad:
1. hero impactante
2. navegación centrada y limpia
3. projects con layouts alternados y reveals fuertes
4. modal refinado
5. studies ligera
6. secondary sections compactas
7. motion y ambient effects bien hechos
8. soporte futuro para imágenes e íconos

SALIDA ESPERADA
Devuélveme directamente los cambios en código para los archivos necesarios, organizados y listos para aplicar.
Si hace falta crear componentes nuevos, créalos.
Si hace falta ajustar estilos globales, ajústalos.
Si hace falta modificar el layout general, modifícalo.

Quiero un resultado que se vea diseñado de verdad.
Quiero que deslumbre.
Quiero que siga siendo técnico.
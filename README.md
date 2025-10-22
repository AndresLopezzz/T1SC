# Backend para Cards & Cards y Álbum Panini Fútbol

Este proyecto es un backend fullstack desarrollado con **Bun** y **Elysia** para dos sistemas:

1. **Sistema de tarjetas de juego** (estilo Magic o Yu-Gi-Oh): Gestiona tarjetas con nombre, tipo (Fuego, Agua, Tierra), poder, ciudad de origen e imagen (URL).
2. **API de álbum Panini digital para el Mundial 2026**: Gestiona selecciones de fútbol (país, confederación, veces campeón, escudo) y jugadores (nombre, edad, equipo, imagen, estadísticas como dribling, velocidad, regate).

## Tecnologías usadas
- **Bun**: Runtime rápido para JavaScript/TypeScript.
- **Elysia**: Framework web moderno para APIs REST.
- **Prisma**: ORM para la base de datos SQLite.
- **TypeScript**: Para tipado fuerte.

## Instalación y ejecución
1. Instala dependencias: `bun install`
2. Configura la DB: `bunx prisma db push`
3. Pobla con datos de ejemplo: `bun run src/seed.ts`
4. Ejecuta el servidor: `bun run dev`

El servidor corre en http://localhost:3000.

## Rutas de la API
### Tarjetas
- `GET /tipos` - Lista tipos
- `GET /ciudades` - Lista ciudades
- `GET /tarjetas` - Lista tarjetas (con tipo y ciudad)
- `GET /tarjetas/:id` - Detalle de una tarjeta
- `POST /tarjetas` - Crear tarjeta (JSON: { nombre, tipoId, ciudadId, poder, imagenUrl })

### Fútbol
- `GET /confederaciones` - Lista confederaciones
- `GET /selecciones` - Lista selecciones (con confederación)
- `GET /selecciones/:id` - Detalle de una selección (con jugadores)
- `POST /selecciones` - Crear selección (JSON: { pais, confederacionId, vecesCampeon, escudoUrl })
- `GET /jugadores` - Lista jugadores (con selección)
- `GET /jugadores/:id` - Detalle de un jugador
- `POST /jugadores` - Crear jugador (JSON: { nombre, edad, seleccionId, imagenUrl, dribling, velocidad, regate })

Usa herramientas como Postman o curl para probar. Ejemplo: `curl http://localhost:3000/tarjetas`

Proyecto creado con `bun init` en Bun v1.3.1. [Bun](https://bun.com) es un runtime rápido.

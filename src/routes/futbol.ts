import { Elysia, t } from "elysia";
import { prisma } from "../lib/prisma";

export const futbolRoutes = new Elysia()
  .get("/confederaciones", async () => await prisma.confederacion.findMany())
  .get("/confederaciones/:id", async ({ params }) => {
    const id = parseInt(params.id);
    const confederacion = await prisma.confederacion.findUnique({
      where: { id },
    });
    if (!confederacion) throw new Error("Confederación no encontrada");
    return confederacion;
  })
  .get(
    "/selecciones",
    async () =>
      await prisma.seleccion.findMany({ include: { confederacion: true } }),
  )
  .get("/selecciones/:id", async ({ params }) => {
    const id = parseInt(params.id);
    const seleccion = await prisma.seleccion.findUnique({
      where: { id },
      include: { confederacion: true, jugadores: true },
    });
    if (!seleccion) throw new Error("Selección no encontrada");
    return seleccion;
  })
  .get("/selecciones/:id/jugadores", async ({ params }) => {
    const id = parseInt(params.id);
    return await prisma.jugador.findMany({
      where: { seleccionId: id },
      include: { seleccion: true },
    });
  })
  .post("/selecciones", async ({ body }) => {
    return await prisma.seleccion.create({
      data: body as any,
      include: { confederacion: true },
    });
  })
  .get(
    "/jugadores",
    async () => await prisma.jugador.findMany({ include: { seleccion: true } }),
  )
  .get("/jugadores/:id", async ({ params }) => {
    const id = parseInt(params.id);
    const jugador = await prisma.jugador.findUnique({
      where: { id },
      include: { seleccion: true },
    });
    if (!jugador) throw new Error("Jugador no encontrado");
    return jugador;
  })
  .post("/jugadores", async ({ body }) => {
    return await prisma.jugador.create({
      data: body as any,
      include: { seleccion: true },
    });
  });

import { Elysia } from "elysia";
import { prisma } from "../lib/prisma";

export const futbolRoutes = new Elysia()
  .get("/confederaciones", async () => await prisma.confederacion.findMany())
  .get(
    "/confederaciones/:id",
    async ({ params: { id } }) =>
      await prisma.confederacion.findUnique({ where: { id: parseInt(id) } }),
  )
  .get(
    "/selecciones",
    async () =>
      await prisma.seleccion.findMany({ include: { confederacion: true } }),
  )
  .get(
    "/selecciones/:id",
    async ({ params: { id } }) =>
      await prisma.seleccion.findUnique({
        where: { id: parseInt(id) },
        include: { confederacion: true, jugadores: true },
      }),
  )
  .post(
    "/selecciones",
    async ({ body }) =>
      await prisma.seleccion.create({
        data: body,
        include: { confederacion: true },
      }),
  )
  .get(
    "/jugadores",
    async () => await prisma.jugador.findMany({ include: { seleccion: true } }),
  )
  .get(
    "/jugadores/:id",
    async ({ params: { id } }) =>
      await prisma.jugador.findUnique({
        where: { id: parseInt(id) },
        include: { seleccion: true },
      }),
  )
  .post(
    "/jugadores",
    async ({ body }) =>
      await prisma.jugador.create({ data: body, include: { seleccion: true } }),
  );

import { Elysia } from "elysia";
import { prisma } from "../lib/prisma";

export const tarjetasRoutes = new Elysia()
  .get("/tipos", async () => await prisma.tipo.findMany())
  .get("/tipos/:id", async ({ params }) => {
    const id = parseInt(params.id);
    const tipo = await prisma.tipo.findUnique({ where: { id } });
    if (!tipo) throw new Error("Tipo no encontrado");
    return tipo;
  })
  .get("/ciudades", async () => await prisma.ciudad.findMany())
  .get("/ciudades/:id", async ({ params }) => {
    const id = parseInt(params.id);
    const ciudad = await prisma.ciudad.findUnique({ where: { id } });
    if (!ciudad) throw new Error("Ciudad no encontrada");
    return ciudad;
  })
  .get(
    "/tarjetas",
    async () =>
      await prisma.tarjeta.findMany({ include: { tipo: true, ciudad: true } }),
  )
  .get("/tarjetas/:id", async ({ params }) => {
    const id = parseInt(params.id);
    const tarjeta = await prisma.tarjeta.findUnique({
      where: { id },
      include: { tipo: true, ciudad: true },
    });
    if (!tarjeta) throw new Error("Tarjeta no encontrada");
    return tarjeta;
  })
  .post("/tarjetas", async ({ body }) => {
    return await prisma.tarjeta.create({
      data: body as any,
      include: { tipo: true, ciudad: true },
    });
  });

import { Elysia } from 'elysia'
import { prisma } from '../lib/prisma'

export const tarjetasRoutes = new Elysia()
  .get('/tipos', async () => await prisma.tipo.findMany())
  .get('/tipos/:id', async ({ params: { id } }) => await prisma.tipo.findUnique({ where: { id: parseInt(id) } }))
  .get('/ciudades', async () => await prisma.ciudad.findMany())
  .get('/ciudades/:id', async ({ params: { id } }) => await prisma.ciudad.findUnique({ where: { id: parseInt(id) } }))
  .get('/tarjetas', async () => await prisma.tarjeta.findMany({ include: { tipo: true, ciudad: true } }))
  .get('/tarjetas/:id', async ({ params: { id } }) => await prisma.tarjeta.findUnique({
    where: { id: parseInt(id) },
    include: { tipo: true, ciudad: true }
  }))
  .post('/tarjetas', async ({ body }) => await prisma.tarjeta.create({ data: body, include: { tipo: true, ciudad: true } }))

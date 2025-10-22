import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Crear tipos para tarjetas
  const tipoFuego = await prisma.tipo.create({ data: { nombre: "Fuego" } });
  const tipoAgua = await prisma.tipo.create({ data: { nombre: "Agua" } });
  const tipoTierra = await prisma.tipo.create({ data: { nombre: "Tierra" } });

  // Crear ciudades
  const ciudadTokyo = await prisma.ciudad.create({ data: { nombre: "Tokio" } });
  const ciudadNuevaYork = await prisma.ciudad.create({
    data: { nombre: "Nueva York" },
  });
  const ciudadParis = await prisma.ciudad.create({ data: { nombre: "París" } });

  // Crear tarjetas
  await prisma.tarjeta.create({
    data: {
      nombre: "Dragón de Fuego",
      tipoId: tipoFuego.id,
      ciudadId: ciudadTokyo.id,
      poder: 100,
      imagenUrl: "https://example.com/dragon-fuego.jpg",
    },
  });
  await prisma.tarjeta.create({
    data: {
      nombre: "Tiburón Acuático",
      tipoId: tipoAgua.id,
      ciudadId: ciudadNuevaYork.id,
      poder: 80,
      imagenUrl: "https://example.com/tiburon-agua.jpg",
    },
  });
  await prisma.tarjeta.create({
    data: {
      nombre: "Gigante de Tierra",
      tipoId: tipoTierra.id,
      ciudadId: ciudadParis.id,
      poder: 120,
      imagenUrl: "https://example.com/gigante-tierra.jpg",
    },
  });

  // Crear confederaciones
  const confederacionConcacaf = await prisma.confederacion.create({
    data: { nombre: "Concacaf" },
  });
  const confederacionConmebol = await prisma.confederacion.create({
    data: { nombre: "Conmebol" },
  });
  const confederacionUefa = await prisma.confederacion.create({
    data: { nombre: "UEFA" },
  });

  // Crear selecciones
  const seleccionMexico = await prisma.seleccion.create({
    data: {
      pais: "México",
      confederacionId: confederacionConcacaf.id,
      vecesCampeon: 0,
      escudoUrl: "https://example.com/mexico-escudo.jpg",
    },
  });
  const seleccionArgentina = await prisma.seleccion.create({
    data: {
      pais: "Argentina",
      confederacionId: confederacionConmebol.id,
      vecesCampeon: 3,
      escudoUrl: "https://example.com/argentina-escudo.jpg",
    },
  });
  const seleccionFrancia = await prisma.seleccion.create({
    data: {
      pais: "Francia",
      confederacionId: confederacionUefa.id,
      vecesCampeon: 2,
      escudoUrl: "https://example.com/francia-escudo.jpg",
    },
  });

  // Crear jugadores
  await prisma.jugador.create({
    data: {
      nombre: "Lionel Messi",
      edad: 36,
      seleccionId: seleccionArgentina.id,
      imagenUrl: "https://example.com/messi.jpg",
      dribling: 95,
      velocidad: 85,
      regate: 98,
    },
  });
  await prisma.jugador.create({
    data: {
      nombre: "Kylian Mbappé",
      edad: 25,
      seleccionId: seleccionFrancia.id,
      imagenUrl: "https://example.com/mbappe.jpg",
      dribling: 90,
      velocidad: 97,
      regate: 92,
    },
  });
  await prisma.jugador.create({
    data: {
      nombre: "Hirving Lozano",
      edad: 28,
      seleccionId: seleccionMexico.id,
      imagenUrl: "https://example.com/lozano.jpg",
      dribling: 85,
      velocidad: 88,
      regate: 87,
    },
  });

  console.log("Datos de ejemplo insertados!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

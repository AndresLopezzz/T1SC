import "dotenv/config";
import { Elysia } from "elysia";
import { tarjetasRoutes } from "./routes/tarjetas";
import { futbolRoutes } from "./routes/futbol";

const app = new Elysia()
  .get("/", () => "Hola, API de Cards & Cards y Fútbol!")
  .use(tarjetasRoutes)
  .use(futbolRoutes)
  .listen(3000);

console.log("Servidor corriendo en http://localhost:3000");

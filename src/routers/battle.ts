import { Hono } from "hono";
import { validator } from "hono/validator";
import { Battle } from "../lib/types";
import prisma from "../db";

const app = new Hono();

app.post("/", async (c) => {
  const data = (await c.req.json()) as Battle;
  console.log("Received data:", data);

  const result = await prisma.battle.create({
    data: {
      id: crypto.randomUUID(),
      judge: data.judge,
      winner: data.winner,
      loser: data.loser,
    },
  });

  return c.json(result);
});
// app.post("/", async (c) => {
//   const data = (await c.req.json()) as Battle;
//   console.log("Received data:", data);

//   const result = await prisma.battle.upsert({
//     where: {
//       judge_winner_loser: {
//         judge: data.judge,
//         winner: data.winner,
//         loser: data.loser,
//       },
//     },
//     create: {
//       id: crypto.randomUUID(),
//       judge: data.judge,
//       winner: data.winner,
//       loser: data.loser,
//     },
//     update: {},
//   });

//   return c.json(result);
// });

export default app;

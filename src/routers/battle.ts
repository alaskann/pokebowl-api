import { Hono } from "hono";
import { Battle } from "../lib/types";
import prisma from "../db";
import { auth } from "../lib/auth";
import { HTTPException } from "hono/http-exception";

export const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.post("/", async (c) => {
  const user = c.get("user");

  if (!user)
    throw new HTTPException(401, { message: "Unauthorized, no valid session" });

  const data = (await c.req.json()) as Battle;

  const result = await prisma.battle.upsert({
    where: {
      judge_winner_loser: {
        judge: user.id,
        winner: data.winner,
        loser: data.loser,
      },
    },
    create: {
      id: crypto.randomUUID(),
      judge: user.id,
      winner: data.winner,
      loser: data.loser,
    },
    update: {},
  });

  return c.json(result);
});

export default app;

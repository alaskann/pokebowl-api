import { Hono } from "hono";
import prisma from "../db";
import { auth } from "../lib/auth";
import { HTTPException } from "hono/http-exception";
import { getBattleStats } from "@prisma/client/sql";

export const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.get("/", async (c) => {
  const user = c.get("user");
  if (!user)
    throw new HTTPException(401, { message: "Unauthorized, no valid session" });

  const result = await prisma.$queryRawTyped(getBattleStats());

  const serializableResult = result.map((result) => ({
    name: result.name,
    wins: Number(result.wins),
    losses: Number(result.losses),
    winLossRatio:
      Number(result.wins) > 0 && Number(result.losses) === 0
        ? Number(result.wins)
        : result.winLossRatio,
  }));

  return c.json(serializableResult);
});

export default app;

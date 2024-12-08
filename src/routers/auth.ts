import { Hono } from "hono";
import { auth } from "../lib/auth.js";
import { HTTPException } from "hono/http-exception";
import prisma from "../db.js";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.get("/*", (c) => auth.handler(c.req.raw));
app.post("/*", (c) => auth.handler(c.req.raw));

app.delete("/delete", async (c) => {
  const user = c.get("user");
  if (!user)
    throw new HTTPException(401, { message: "Unauthorized, no valid session" });

  const res = await prisma.user.delete({
    where: {
      id: user.id,
    },
  });
  if (!res) throw new HTTPException(500, { message: "Internal server error" });

  return c.json({ success: true, message: "Account successfully closed" });
});

export default app;

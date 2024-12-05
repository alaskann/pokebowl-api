import { serve } from "@hono/node-server";
import { Hono } from "hono";
import auth from "./routers/auth";
import battle from "./routers/battle";

export const app = new Hono();

app.route("/api/auth", auth);
app.route("/api/battle", battle);

const port = 3002;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

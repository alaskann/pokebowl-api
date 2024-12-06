import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import auth from "./routers/auth";
import battle from "./routers/battle";

export const app = new Hono();

app.use(
  "/api/*",
  cors({
    origin: "http://localhost:3001", // Allow requests from this origin
    allowHeaders: [
      "Content-Type",
      "X-Custom-Header",
      "Upgrade-Insecure-Requests",
    ],
    allowMethods: ["POST", "GET"], // Allow POST and GET methods
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600, // Cache the preflight response for 600 seconds
    credentials: true, // Allow cookies and credentials
  })
);
app.route("/api/auth", auth);
app.route("/api/battle", battle);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

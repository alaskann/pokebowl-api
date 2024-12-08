import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["http://localhost:3001"],
  session: {
    freshAge: 0,
  },
  advanced: {
    cookiePrefix: "pokebowl-auth",
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },
});

1. **Create environment variables**

```
BETTER_AUTH_SECRET="" # Use openssl to generate a secret key or use any random string in development
BETTER_AUTH_URL="" # Base URL of the app (http://localhost:3000 if you haven't changed anything)
```

2. **Run the following:**

```
npm install
npx prisma migrate dev
npx prisma generate --sql
npm run dev
```

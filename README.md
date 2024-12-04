# Tasuku

Tasuku is a simple todo app that helps you focus on one task at a time.
Built entirely with Expo, Tamagui, tRPC, better-auth, and Drizzle ORM.

The API is built Expo Router using [API Routes](https://docs.expo.dev/router/reference/api-routes).

> [!NOTE]
> If you're looking for real self-hosted todo app, check out [Vikunja](https://vikunja.io/) instead.
> This project is just an experiment to see what I can do with Expo Router API Routes feature.

## Get started

Install dependencies:

```bash
bun install
```

Start the app:

```bash
bun start
# or
bun web
# or
bun android
# or
bun ios
```

## Hosting

Change the `APP_URL` in `src/lib/base-url.ts` to your own URL.
[Build](#building) the application and run the server with Node.js:

```bash
node dist/entry.cjs
```

Check out `.env` file for environment variables. Also accepts `PORT` environment variable.

## Building

```bash
bun run build
```

This will build the app both for frontend and backend. The output will be in the `dist` directory.

This also builds Express server (`entry.cjs`) for easier deployment on any VPS.

If you want to host it somewhere else, you can check out the
[Expo documentation](https://docs.expo.dev/router/reference/api-routes/#deployment) on how to deploy it.

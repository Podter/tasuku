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
```

This will start the Expo development server. You can run the app on your device by scanning the QR code
using the Expo Go app. Open `http://localhost:8081` in your browser to see the web version.

## Run on Android or iOS

There is no APK or IPA file available for download. But you can run it on your device by following [Get started](#get-started) section.

If you want to run on an emulator, you can run:

```bash
bun android
# or
bun ios
```

You can change the `EXPO_PUBLIC_APP_URL` in `.env` file if you want to run the app on a different API server.
Use `http://localhost:8081` for local development.

## Self-hosting

Just simply copy `compose.yml` in this repo to your server and run:

```bash
docker compose up -d
```

This will start the app server and PostgreSQL database. You can access the app on `http://localhost:3000`.

Feel free to modify the `compose.yml` file to suit your needs.

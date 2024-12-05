# Build
FROM node:22-slim AS build
WORKDIR /build
RUN --mount=type=cache,target=/root/.npm \
    npm install -g bun@latest
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=bun.lockb,target=bun.lockb \
    --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile
COPY . .
ARG EXPO_PUBLIC_APP_URL="https://tasuku.podter.hackclub.app"
RUN EXPO_PUBLIC_APP_URL=${EXPO_PUBLIC_APP_URL} bun run build

# Final
FROM gcr.io/distroless/nodejs22 AS final
WORKDIR /app
ENV NODE_ENV production
ENV PORT 3000
EXPOSE ${PORT}
COPY --from=build /build/dist/ .
CMD ["entry.cjs"]

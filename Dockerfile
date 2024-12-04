# Build
FROM node:22-alpine AS build
WORKDIR /build
RUN --mount=type=cache,target=/root/.npm \
    npm install -g bun@latest
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=bun.lockb,target=bun.lockb \
    --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile
COPY . .
RUN bun run build

# Final
FROM gcr.io/distroless/nodejs22 AS final
WORKDIR /app
ENV NODE_ENV production
ENV PORT 3000
EXPOSE ${PORT}
COPY --from=build /app/dist/ .
CMD ["entry.cjs"]

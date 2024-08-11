# Builder base
FROM node:20-alpine AS builder
WORKDIR /build
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@latest

# Build app
FROM builder AS app-build
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=bind,source=.npmrc,target=.npmrc \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile
COPY . .
RUN pnpm tailwindcss -i src/global.css -o node_modules/.cache/nativewind/global.css.web.css
RUN pnpm run build

# Build server
FROM builder AS server-build
RUN --mount=type=bind,source=server/package.json,target=package.json \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install

# Final
FROM gcr.io/distroless/nodejs20:nonroot AS final
WORKDIR /app
ENV NODE_ENV production
COPY server/ .
COPY --from=server-build /build/node_modules ./node_modules
COPY --from=app-build /build/dist ./dist
CMD ["server.mjs"]

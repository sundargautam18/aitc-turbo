# ---------- BASE IMAGE ----------
# Use Node Alpine for smaller image size
FROM node:20-alpine AS base

# Install system dependencies for native modules in one layer
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++ \
    pkgconfig \
    cairo-dev \
    pango-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    giflib-dev \
    pixman-dev \
    bash \
    curl

WORKDIR /app

# ---------- BUILD STAGE ----------
FROM base AS build

# Copy only package files first to leverage Docker caching
COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
COPY turbo.json ./

# Install dependencies in the root node_modules
RUN npm ci --legacy-peer-deps

# Copy the rest of the code
COPY apps apps
COPY packages packages

# Build the web app
WORKDIR /app/apps/web
RUN npm run build

# ---------- PRODUCTION IMAGE ----------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only production dependencies to reduce image size
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --legacy-peer-deps

# Copy built files from build stage
COPY --from=build /app/apps/web/.next .next
COPY --from=build /app/apps/web/public ./public

EXPOSE 3000

CMD ["npm", "run", "start"]

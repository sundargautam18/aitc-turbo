# Base image with system dependencies
FROM node:20-alpine AS base

# Install system dependencies for canvas and other native modules
RUN apk add --no-cache libc6-compat python3 make g++ pkgconfig cairo-dev pango-dev libpng-dev libjpeg-turbo-dev giflib-dev pixman-dev

WORKDIR /app

# Build stage
FROM base AS build

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json

# Install dependencies
RUN npm ci

# Copy the rest of the code
COPY apps apps
COPY packages packages
COPY turbo.json ./

# Build only the web app
WORKDIR /app/apps/web
RUN npm run build

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built web app and production dependencies
COPY --from=build /app/apps/web/.next .next
COPY --from=build /app/apps/web/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
# COPY --from=build /app/apps/web/public ./public  # uncomment if you have static public files

EXPOSE 3000

CMD ["npm", "run", "start"]

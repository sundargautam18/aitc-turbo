I am using this initial command to generate a turbo repo with tailwindcss.

```jsx
pnpm dlx create-turbo@latest -e with-tailwind
```

---

# 🚀 Creating a Shared Axios Client in Turborepo (TypeScript + Latest Setup)

A common Turborepo pattern is to put **shared utilities** in a `packages/` folder so they can be imported by multiple apps.

Here’s how to set up a **shared Axios client** that works in ESM, CommonJS, and supports full TypeScript types.

---

## **1. Monorepo Structure**

```bash
my-turborepo/
├─ apps/
│  ├─ web/              # Example app
│  └─ admin/            # Another app
├─ packages/
│  └─ axios-client/     # Shared axios package which we will be creating
├─ package.json
├─ turbo.json

```

---

## **2. Create the Package**

Inside `packages/`:

```bash
mkdir axios-client
cd axios-client
npm init -y
npm install axios

```

---

## **4. Axios Client Code**

`packages/axios-client/src/index.ts`

```tsx
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.API_BASE_URL || "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = process.env.API_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

```

---

## **5. TypeScript Config**

`packages/axios-client/tsconfig.json`

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": false
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}

```

> Key setting: "declaration": true — ensures .d.ts files are generated for type safety.
> 

---

## **6. Package Config**

`packages/axios-client/package.json`

```json
{
  "name": "@repo/axios-client",
  "version": "1.0.0",
  "type": "module",
  "license": "MIT",
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc"
  },
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "dependencies": {
    "axios": "^1.7.0"
  },
  "devDependencies": {
    "@repo/typescript-config": "*",
    "typescript": "latest"
  },
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}

```

**Why this works:**

- `"main"` points to compiled JS, not `.ts` source.
- `"types"` points to generated `.d.ts` in `dist/`.
- `"exports"` ensures ESM and CJS compatibility.

---

## **7. Build the Package**

From the root of your Turborepo:

```bash
turbo run build --filter=@repo/axios-client

```

After building, you should see:

```
packages/axios-client/dist/index.js
packages/axios-client/dist/index.d.ts

```

---

## 8. Using the Package in Your Apps

Now that we have two apps (app and web), let's implement our package.

For the web app, here's how to use the axios client package:

```
{
  "name": "web",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3001 --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint --max-warnings 0",
    "check-types": "tsc --noEmit"
  },
  "dependencies": {
    "@repo/ui": "*",
    "@repo/math": "*",
    "@repo/axios-client": "*", /*import your package*/
    "next": "^15.4.2",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@next/eslint-plugin-next": "^15.4.2",
    "@repo/eslint-config": "*",
    "@repo/tailwind-config": "*",
    "@repo/typescript-config": "*",
    "@tailwindcss/postcss": "^4.1.5",
    "@types/node": "^22.15.30",
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.33.0",
    "postcss": "^8.5.3",
    "tailwindcss": "^4.1.5",
    "typescript": "5.9.2"
  }
}

```

This works fine….

Similarly you can create common react hooks for scenarios like: react native and react

react-hooks/
src→ index.ts

```jsx
export { useCounter } from "./useCounter.js";

```

src/useCounter.ts

```jsx
import { useState, useCallback } from "react";

export function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount((c) => c + 1), []);
  const decrement = useCallback(() => setCount((c) => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
}

```

Package.json

```jsx
{
  "name": "@repo/react-hooks",
  "version": "1.0.0",
  "type": "module",
  "license": "MIT",
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc"
  },
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "dependencies": {
    "react": "^19.0.0"
  },
  "devDependencies": {
    "@repo/typescript-config": "*",
    "typescript": "latest"
  },
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}

```

import in desired app:
  "@repo/react-hooks": "*",

and the use after rebuilding and reinstalling

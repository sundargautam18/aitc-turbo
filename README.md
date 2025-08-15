Sure! Here’s a **complete list of commands** to build, run, and manage your Dockerized `apps/web` app (npm-based, using your current Dockerfile and Docker Compose setup). I’ll cover **production and development modes**.

---

## **1️⃣ Build Docker images**

Build all services defined in `docker-compose.yml`:

```bash
docker-compose build
```

Build only the `web` service:

```bash
docker-compose build web
```

---

## **2️⃣ Start containers**

Run in detached mode (background):

```bash
docker-compose up -d
```

Run only the `web` service:

```bash
docker-compose up -d web
```

---

## **3️⃣ View logs**

To follow logs for all services:

```bash
docker-compose logs -f
```

To follow logs for `web` only:

```bash
docker-compose logs -f web
```

---

## **4️⃣ Stop containers**

Stop all running containers:

```bash
docker-compose down
```

Stop only the `web` container:

```bash
docker-compose stop web
```

---

## **5️⃣ Restart containers**

Restart all containers:

```bash
docker-compose restart
```

Restart `web` only:

```bash
docker-compose restart web
```

---

## **6️⃣ Access your app in browser**

Since your `docker-compose.yml` maps:

```yaml
ports:
  - '3000:3000'
```

* Open:

```
http://localhost:3000
```

or, if running on a remote server:

```
http://<server-ip>:3000
```

---

## **7️⃣ Run in development mode with hot reload**

1. Modify your `docker-compose.yml` for volumes (optional):

```yaml
volumes:
  - ./apps/web:/app/apps/web
  - /app/node_modules
```

2. Make sure `Dockerfile` CMD is:

```dockerfile
CMD ["npm", "run", "start:dev"]
```

3. Start in dev mode:

```bash
docker-compose up
```

* App will automatically reload when you change files locally.

---

## **8️⃣ Remove stopped containers/images (cleanup)**

Remove all stopped containers:

```bash
docker container prune
```

Remove all unused images:

```bash
docker image prune -a
```

---

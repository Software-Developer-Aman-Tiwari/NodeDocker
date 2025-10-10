# Getting Started with Docker

## 🐳 **What is Docker?**

**Docker** is an **open-source platform** that lets you build, package, and run applications **in containers**.
A **container** is a lightweight, portable, and isolated environment that contains everything an app needs to run — code, libraries, dependencies, runtime, etc.

👉 Think of it like:

> “A virtual box that holds your app and all the stuff it needs — so it runs the same everywhere: on your laptop, your friend’s laptop, or a cloud server.”

---

## ⚙️ **Why Do We Need Docker?**

Without Docker:

* The app may work on your system but fail on another (the classic **“it works on my machine”** problem).
* Setting up dependencies is time-consuming.
* Deployment to production is error-prone.

With Docker:

* You ship a **container** that runs exactly the same anywhere.

---

## 🚀 **How Docker Works (in simple terms)**

1. **Dockerfile** → You define your app’s environment (base image, commands, dependencies).
2. **Image** → Docker builds an image (a snapshot of your app).
3. **Container** → You run that image → Docker creates a running instance (container).

Example:

```bash
# Build image
docker build -t my-express-app .
# -t means tag (name)

# Run container
docker run -p 5000:5000 my-express-app

docker-compose up --scale backend=3 -d
ec2-54-91-217-186.compute-1.amazonaws.com

icacls "MyWebServer.pem" /inheritance:r
icacls "MyWebServer.pem" /grant:r "$($env:USERNAME):(R)"
icacls "MyWebServer.pem"


chmod 400 "MyWebServer.pem"
ssh -i "MyWebServer.pem" ec2-user@ec2-54-91-217-186.compute-1.amazonaws.com
```

---

## 🌟 **Key Features of Docker**

| 🧩 Feature                   | 💡 Description                                 | 🎓 Benefit for Students                              |
| ---------------------------- | ---------------------------------------------- | ---------------------------------------------------- |
| **Containerization**         | Packages code + dependencies together          | No need to install extra libraries manually          |
| **Portability**              | Runs anywhere — Windows, Mac, Linux, Cloud     | Develop once, deploy anywhere                        |
| **Isolation**                | Each container is independent                  | No conflict between projects (e.g., Node v14 vs v18) |
| **Lightweight**              | Shares OS kernel (unlike heavy VMs)            | Fast startup, less RAM usage                         |
| **Version Control for Apps** | Each Docker image is versioned                 | Easy rollback to previous stable version             |
| **Scalability**              | Run multiple containers simultaneously         | Learn microservices architecture                     |
| **Networking**               | Containers can talk to each other via networks | Useful for full-stack projects (API + DB)            |
| **Integration with CI/CD**   | Works with Jenkins, GitHub Actions, AWS, etc.  | Practice DevOps pipelines easily                     |
| **Open Source Ecosystem**    | Huge community and resources                   | Free for learning and experimenting                  |

---

## 🧠 **Docker Concepts You Should Know**

| Concept            | Description                                               |
| ------------------ | --------------------------------------------------------- |
| **Dockerfile**     | Text file with instructions to build your image           |
| **Image**          | A read-only blueprint for a container                     |
| **Container**      | A running instance of an image                            |
| **Docker Hub**     | Public registry to store and share Docker images          |
| **Volume**         | Persistent data storage for containers                    |
| **Network**        | Communication bridge between containers                   |
| **Docker Compose** | Tool to run multiple containers together (e.g., app + DB) |

---

## 🧰 **Example for Students**

Let’s say you built a **Node.js + MongoDB** project for your assignment.

Without Docker:

* You install Node, npm, MongoDB separately.
* Your classmate’s setup might differ → errors.

With Docker:

* You create a `Dockerfile` for Node.js app.
* Use `docker-compose.yml` to run MongoDB + app together.
* Everyone can just run:

  ```bash
  docker-compose up
  ```

  and it **just works**.

---

## 💼 **Why Students Should Learn Docker**

✅ Makes you **industry-ready** (used everywhere: DevOps, Cloud, Backend)
✅ Helps in **project deployment** (AWS, Azure, GCP, Render, etc.)
✅ Boosts your **resume and portfolio**
✅ Simplifies **collaboration and debugging** in group projects
✅ Lays foundation for **Kubernetes and Microservices**

---

docker build -t express-app .
docker run express-app node -v
docker run -p 5000:5000 --env-file .env express-app

```js
Good — you’re almost there, but let’s go through this **step by step clearly**, because there are a few small but important points (like the correct port and environment setup).

---

### 🚀 Step-by-Step: Deploy Express App on EC2 with Docker

#### **1️⃣ SSH into your EC2 instance**

If your EC2 key file is `my-key.pem` and your instance is Ubuntu:

```bash
ssh -i "my-key.pem" ubuntu@<EC2-PUBLIC-IP>
```

(Use `ec2-user` instead of `ubuntu` if you’re on Amazon Linux.)

---

#### **2️⃣ Install Docker**

Run these commands on the EC2 instance:

```bash
sudo apt update -y
sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER
```

Then **log out and back in** so that your user can run Docker without `sudo`.

---

#### **3️⃣ Copy your project to EC2**

From your local machine (not EC2), run:

```bash
cd ..
scp -i MyWebServer.pem -r ./learn_module ec2-user@54.234.106.134:/home/ec2-user/
```

This copies your entire project folder to `/home/ubuntu/express-app` on EC2.

---

#### **4️⃣ Build and run Docker container**

Once back inside EC2 (via SSH):

```bash
cd express-app
docker build -t express-app .
docker run -d -p 3000:3000 --env-file .env express-app
```

✅ This will:

* Build an image named `express-app`
* Run it in detached mode (`-d`)
* Map port 3000 inside the container to 3000 on EC2
* Load environment variables from `.env`

---

#### **5️⃣ Security Group settings**

Make sure your EC2 **security group** allows inbound traffic on **port 3000** (not 5000).
If your app listens on another port inside Docker (say 5000), adjust accordingly:

```bash
docker run -d -p 5000:5000 --env-file .env express-app
```

Then open **port 5000** in your EC2 instance’s **Inbound Rules**.

---

#### **6️⃣ Access your app**

Now visit in your browser:

```
http://<EC2-PUBLIC-IP>:3000
```

(or `:5000` if that’s the port you exposed).

---

#### ✅ Quick Troubleshooting

If it doesn’t open:

```bash
docker ps
```

→ Check that the container is running.

If you need logs:

```bash
docker logs <container_id>
```

If you need to stop and remove:

```bash
docker stop <container_id>
docker rm <container_id>
```

`docker-compose up --scale backend=3`

---

```
cd ..
scp -i learn_module/MyWebServer.pem -r ./learn_module ec2-user@54.234.106.134:/home/ec2-user/




















Nice — I’ll explain this end-to-end: **how Docker behaves locally vs on an EC2 (AMI2023) server**, and then give a clear **step-by-step** workflow you can follow (two deployment methods). I’ll include the exact commands you’ll need and common pitfalls. Let’s go 🚀

# 1) Quick concept: how Docker works (local vs EC2) — plain language

* **Image**: a frozen snapshot (built from your `Dockerfile`) that contains app code + runtime + dependencies.
* **Container**: a running instance of an image (isolated process + network namespace).
* **Docker daemon**: runs on the host (your laptop or EC2) and manages images/containers.
* **Docker client**: `docker` / `docker compose` commands you run talk to the daemon.
* **Registry**: place to push/pull images (Docker Hub, AWS ECR).
* **docker-compose**: defines multi-service setups (networks, env, volumes) and orchestrates them locally.

Differences between local and EC2:

* Locally you usually build images on your machine, run containers and frequently rebuild with volume mounts for fast dev.
* On EC2 you usually either:

  * Build **on the server** from your source (recommended for quick manual deploys), or
  * Build locally (CI) → push image to a registry (ECR) → pull image on EC2 (recommended for production / CI/CD).
* Networking differs: on EC2 you must open **security group** ports; inside container apps must listen on `0.0.0.0` for host-to-container mapping to work.

# 2) Local workflow (fast dev + test)

1. Ensure your `Dockerfile` installs deps and sets working dir:

   ```dockerfile
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --omit=dev
   COPY . .
   EXPOSE 5000
   CMD ["node","index.js"]
   ```
2. `.dockerignore` should contain:

   ```
   node_modules
   npm-debug.log
   .env
   .git
   ```
3. Build & run with Compose (recommended):

   ```bash
   # one-time build (or builds only if needed)
   docker compose build

   # run (foreground)
   docker compose up

   # or rebuild & run detached
   docker compose up --build -d

   # logs
   docker compose logs -f

   # shell into running container
   docker exec -it <container_name_or_id> sh
   ```
4. Quick troubleshooting:

   * `ERR_EMPTY_RESPONSE` → check `app.listen(5000, '0.0.0.0')`
   * `docker ps` to confirm container up
   * `docker compose logs -f` to view errors

# 3) Deploy on EC2 (Amazon Linux 2023) — two methods

---

## Method A — *Build on the EC2* (simple, no registry)

When to use: quick deploys or you don’t have CI/ECR yet.

### Steps (copy-paste ready)

1. **Install Docker on AMI2023**

   ```bash
   sudo dnf update -y
   sudo dnf install docker -y
   sudo systemctl enable --now docker
   sudo usermod -aG docker ec2-user
   # re-login or run newgrp docker to refresh group
   ```

2. **Install Docker Compose** (official binary)

   ```bash
   # get latest tag and install
   DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep tag_name | cut -d '"' -f 4)
   sudo curl -SL "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-linux-x86_64" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose

   # optional: enable plugin style
   sudo mkdir -p /usr/libexec/docker/cli-plugins
   sudo ln -s /usr/local/bin/docker-compose /usr/libexec/docker/cli-plugins/docker-compose
   ```

3. **Copy source to EC2** (exclude node_modules)

   * Preferred (rsync):

     ```bash
     rsync -avz --exclude 'node_modules' -e "ssh -i MyWebServer.pem" ./my-backend ec2-user@<EC2-IP>:/home/ec2-user/
     ```
   * Or delete `node_modules` locally then use `scp -r`:

     ```bash
     rm -rf node_modules
     scp -i MyWebServer.pem -r ./my-backend ec2-user@<EC2-IP>:/home/ec2-user/
     ```

4. **On EC2: run app**

   ```bash
   cd ~/my-backend
   docker compose up --build -d
   ```

5. **Open ports in Security Group**

   * In AWS Console, allow inbound for port `5000` (or 80/443 if proxied).
   * Or bind to `127.0.0.1:5000:5000` if you will proxy through Nginx.

6. **Verify**

   ```bash
   docker ps
   curl http://localhost:5000
   ```

7. **Auto-start on reboot (systemd unit example)**
   `/etc/systemd/system/docker-compose-app.service`

   ```ini
   [Unit]
   Description=Docker Compose App
   Requires=docker.service
   After=docker.service

   [Service]
   WorkingDirectory=/home/ec2-user/my-backend
   ExecStart=/usr/local/bin/docker-compose up -d
   ExecStop=/usr/local/bin/docker-compose down
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

   ```bash
   sudo systemctl enable docker-compose-app
   sudo systemctl start docker-compose-app
   ```

---

## Method B — *Build locally / push to ECR and deploy* (recommended for production)

When to use: you want CI/CD, immutable images, faster rollbacks.

### Steps overview

1. Create an ECR repository (`aws ecr create-repository ...`).
2. Build image locally and tag it with ECR URI:

   ```bash
   docker build -t my-backend:latest .
   docker tag my-backend:latest <aws_account>.dkr.ecr.<region>.amazonaws.com/my-backend:latest
   ```
3. Login to ECR & push:

   ```bash
   aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws_account>.dkr.ecr.<region>.amazonaws.com
   docker push <aws_account>.dkr.ecr.<region>.amazonaws.com/my-backend:latest
   ```
4. On EC2, `docker pull` and `docker run` (or use `docker compose` with image: <ecr-uri>).

   ```bash
   docker pull <ecr-uri>:latest
   docker run -d -p 5000:5000 <ecr-uri>:latest
   ```
5. For updates, push a new image and on EC2 do `docker pull` + `docker compose up -d` or `docker run` replacement.

> Note: ECR requires AWS CLI configured with credentials on the machine that pushes.

# 4) Practical checklist & best practices (don’t miss these)

* **App listen**: `app.listen(PORT, "0.0.0.0")` inside container.
* **.dockerignore**: exclude `node_modules`, local dev files, `.env`.
* **Don’t upload node_modules** via scp — use `.dockerignore` + build inside container or push images to registry.
* **Security group**: open the ports you actually want (avoid opening app ports to world; prefer Nginx/ALB on 80/443).
* **Restart policy**: in `docker-compose.yml` add `restart: unless-stopped`.
* **Remove `container_name`** if you plan to scale with compose.
* **Use volumes** for persistent data if needed (databases, logs).
* **Use environment variables/secrets**: do not commit `.env`. Use ECS secrets, SSM, or mounted files.
* **Logging**: forward logs to CloudWatch or collect in a volume for rotation.
* **SSL**: terminate SSL at Nginx or ALB; use Let’s Encrypt or ACM (if using load balancer).
* **Monitoring**: add basic health check endpoints and use CloudWatch or Prometheus for metrics.

# 5) Useful commands summary

```bash
# local
docker compose up --build -d
docker compose logs -f
docker exec -it <container> sh

# build & tag image
docker build -t my-backend:latest .
docker tag my-backend:latest <ECR_URI>:latest

# ECR push (example)
aws ecr get-login-password | docker login --username AWS --password-stdin <ECR_URI>
docker push <ECR_URI>:latest

# on EC2
docker compose up --build -d
docker ps
docker compose logs -f
```

# 6) Troubleshooting quick list

* `ERR_EMPTY_RESPONSE` → check `0.0.0.0`, correct port, container running (`docker ps`), app not crashing (logs).
* `permission denied` on PEM when SSH → `chmod 400 MyWebServer.pem`.
* `docker compose` not found on AL2023 → install binary + symlink (see above).
* `container name already in use` → remove `container_name` or change it.

---

If you want, I can:

* Give you a **one-shot deploy script** for AMI2023 that installs Docker, Compose and runs your repo (copy-paste ready), **or**
* Show the **ECR + CI/CD** commands with exact AWS CLI steps (if you’ll use ECR/CI).

Which of those do you want next?

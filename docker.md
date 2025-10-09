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
scp -i "my-key.pem" -r ./express-app ubuntu@<EC2-PUBLIC-IP>:/home/ubuntu/
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
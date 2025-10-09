# Getting started with pm2

```bash
npm i -g pm2
pm2 start index.js --name myapp
pm2 list
pm2 stop myapp
pm2 restart myapp
pm2 logs myapp
pm2 startup
pm2 save
pm2 start app.js -i max
# 1. Install Node & PM2
sudo apt update
sudo apt install -y nodejs npm
sudo npm install -g pm2

# 2. Clone your project
git clone https://github.com/username/myapp.git
cd myapp
npm install

# 3. Start app
pm2 start app.js --name myapp

# 4. Enable startup
pm2 startup
pm2 save

# 5. Check logs
pm2 logs
```

```bash

docker compose build
docker compose up
docker compose up --build
docker exec -it my-backend sh
curl http://localhost:5000

```
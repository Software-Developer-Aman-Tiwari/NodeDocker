# Use official Node.js 22 LTS image (Alpine = lightweight)
# FROM node:22-alpine
FROM node:22-bullseye  
# Debian-based, better DNS support


# Set working directory
WORKDIR /app

# Copy only package files first for efficient caching
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy remaining source files
COPY . .

# Expose the port your app runs on
EXPOSE 5000

RUN npm install pm2 -g
CMD ["pm2-runtime", "index.js"]

# Start the app
# CMD ["node", "index.js"]
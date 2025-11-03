# --- STAGE 1: The "Builder" ---
# This stage uses Node.js to build your Vite project

# Use an official Node.js 18 image. "alpine" is a small, secure version.
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the "package.json" and "package-lock.json" files
COPY package*.json ./

# Install all your project's dependencies from package.json
RUN npm install

# Copy all the rest of your source code (App.tsx, components/, etc.)
COPY . .

# Run the "build" script from your package.json
# This creates the production 'dist' folder
RUN npm run build

# --- STAGE 2: The "Server" ---
# This stage uses Nginx to serve your built files

# Use a tiny, official Nginx (web server) image
FROM nginx:1.25-alpine

# This is where Nginx looks for files to serve
WORKDIR /usr/share/nginx/html

# Remove the default Nginx welcome page
RUN rm -rf ./*

# Copy the built files (from /app/dist in the "builder" stage)
# into the Nginx web directory
COPY --from=builder /app/dist .

# Tell Docker the container will listen on port 80
EXPOSE 80

# The Nginx image will automatically start the server.
# No CMD is needed.
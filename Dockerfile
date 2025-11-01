# --- STAGE 1: The "Builder" ---
# This stage uses Node.js to build your Vite project

# Use an official Node.js 18 image. "alpine" is a small, secure version.
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the "package.json" and "package-lock.json" files
# We copy these first to cache the 'npm install' step
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
```

#### Step 2: Build Your Image Locally

This command tells Docker to read your `Dockerfile` and build the image.

1.  Make sure Docker Desktop is running.
2.  Open your terminal in the project folder (with the `Dockerfile`).
3.  Run:
    ```bash
    docker build -t my-web-app .
    ```
    * `-t my-web-app`: "Tags" (names) your image `my-web-app`.
    * `.`: Tells Docker to build from the current directory.
    * This will take a minute. You'll see it run `npm install` and `npm run build` inside the container.

#### Step 3: Run and Test Your Image Locally

This command runs your newly-built image as a container.

1.  Run this command:
    ```bash
    docker run -d -p 8080:80 my-web-app
    ```
    * `-d`: Runs in "detached" mode (in the background).
    * `-p 8080:80`: **Maps port 8080 on your computer to port 80 inside the container** (where Nginx is running).

2.  **Verify:**
    Open your web browser and go to `http://localhost:8080`. You should see your Interactive Dice Roller app!

3.  **To stop the container:**
    * Find its ID: `docker ps`
    * Stop it: `docker stop <container-id>`

#### Step 4: Push Your Code (The Git Workflow)

You are still on your `develop` branch. You have created a new `Dockerfile`. You must now save this work.

1.  **Add the new file to Git:**
    ```bash
    git add Dockerfile
    ```

2.  **Commit the file:**
    ```bash
    git commit -m "Add Dockerfile for containerization"
    ```

3.  **Push your `develop` branch to GitHub:**
    ```bash
    git push origin develop
    

# Use the official Node.js 18 image as a base
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Install `serve` to serve the production build
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to start the application
CMD ["serve", "-s", "out", "-l", "3000"]

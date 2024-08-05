# Base image
FROM node:21-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json .
COPY package-lock.json .

RUN npm install --omit=dev

# Copy sources (see .dockerignore)
COPY . .

# Build source
RUN npm run build

# Production image
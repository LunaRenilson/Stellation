# Use the official Node.js 20 Alpine image as the base
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install all dependencies (including dev dependencies for TypeScript compilation)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Compile TypeScript to JavaScript
RUN npx tsc

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]

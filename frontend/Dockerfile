# Use official Node.js 20 Alpine image as base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Build the production app
RUN npm run build

# Expose the port used by vite preview (default 4173)
EXPOSE 4173

# Run the app using vite preview
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]

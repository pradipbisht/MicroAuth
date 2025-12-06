# Use lightweight Node image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json first (optimizes cache)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose the port (We will map this in docker-compose)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
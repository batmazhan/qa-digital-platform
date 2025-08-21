# Use Node 18 LTS Alpine version for a smaller image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install production dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js app for production
RUN npm run build

# Expose the port Next.js will run on
EXPOSE 3000

# Start the app in production mode
CMD ["npm", "start"]

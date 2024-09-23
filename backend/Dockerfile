# Use an official Node.js image as the base
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code to the container
COPY . .

# Expose the port the app will run on
EXPOSE 4000

# Start the app
CMD ["npm", "run", "start"]

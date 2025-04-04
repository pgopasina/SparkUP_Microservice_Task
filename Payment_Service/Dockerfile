# Use Node.js 18 as the base image
FROM node:18
# Set the working directory in the container to /app
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package.json ./
# Copy package-lock.json to the working directory
RUN npm install
# Copy the rest of the application code to the working directory
COPY . .
# Set environment variables for the application
CMD ["node", "app.js"]
# Expose port 5001 for the application
EXPOSE 5001

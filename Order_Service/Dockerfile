# Use Node.js 18 as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy dependencies file and install
COPY package.json ./
RUN npm install

# Copy application code
COPY . .

# Start the application
CMD ["node", "index.js"]

# Expose port 5000
EXPOSE 5000

# Use the official Node.js 14 image as the base image
FROM node:14 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if using npm) or yarn.lock (if using yarn) to the container
COPY package*.json ./

# Install the app's dependencies
RUN npm install # or use `yarn install` if using yarn

# Copy the rest of the application code to the container
COPY . .

# Build the React app for production
RUN npm run build # or use `yarn build` if using yarn

# Use a lightweight Node.js image as the final production image
FROM node:14-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the build files from the build stage (previous FROM)
COPY --from=builder /app/build ./build

# Install serve to run the production server
RUN npm install -g serve

# Expose the port on which your React app will run (typically 80 for HTTP)
EXPOSE 3000

# Command to start the production server
CMD ["serve", "-s", "build", "-l", "3000"]

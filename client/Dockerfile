# Use an appropriate Node.js base image
FROM node:14

WORKDIR /app

# Copy the React app files to the container
COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]

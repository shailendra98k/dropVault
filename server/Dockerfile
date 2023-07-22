# Use an appropriate Node.js base image
FROM node:14

WORKDIR /app

# Copy the Express app files to the container
COPY . .

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]

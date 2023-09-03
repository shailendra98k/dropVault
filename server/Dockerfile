# Use an appropriate Node.js base image
FROM node:14 AS builder

WORKDIR /app

# Copy the Express app files to the container
COPY . .

RUN npm install
RUN npm run build

FROM node:14-slim
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env ./.env

EXPOSE 8000

CMD ["node", "dist/bundle.js"]

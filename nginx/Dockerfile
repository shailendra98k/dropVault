# Use the official Nginx base image
FROM nginx:latest

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for Nginx
EXPOSE 8999

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
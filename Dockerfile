# Use the official Nginx Alpine image for a lightweight web server
FROM nginx:alpine

# Copy all static website files to Nginx's default public directory
COPY . /usr/share/nginx/html

# Expose port 80 to access the website
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

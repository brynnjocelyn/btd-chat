# Stage 1: Build the Angular app
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the app in production mode. Adjust as needed for your build command.
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy the built files from the build stage to the Nginx web root
COPY --from=build /app/www /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# By default, nginx image uses "CMD [\"nginx\", \"-g\", \"daemon off;\"]"
# so we don't need to redefine it here.


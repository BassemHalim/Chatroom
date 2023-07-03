FROM node:18-alpine3.17 as build
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

# FROM ubuntu
# RUN apt-get update
# RUN apt-get install nginx -y
# COPY --from=build /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80
# CMD ["nginx","-g","daemon off;"]

FROM nginx:alpine

# RUN rm /etc/nginx/nginx.conf
# Copy the custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built app from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default NGINX port
EXPOSE 5173

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
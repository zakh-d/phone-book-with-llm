FROM node:20-alpine AS builder

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
WORKDIR /app
COPY package*.json .
RUN npm ci
ENV NODE_ENV=production
COPY . .
RUN npm run build

FROM nginx:1.27.3-alpine

COPY ./docker/etc/nginx/templates  /etc/nginx/templates/
COPY --from=builder /app/dist/ /usr/share/nginx/html/
EXPOSE 80
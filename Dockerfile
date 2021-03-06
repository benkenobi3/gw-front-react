# build
FROM node:12-alpine as builder

WORKDIR /app

COPY package.json package.json
RUN npm install --only=prod

COPY . .

RUN npm run build


# start
FROM nginx:1.16.0-alpine

COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

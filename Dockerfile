FROM denoland/deno:alpine-1.29.2

EXPOSE 7777

WORKDIR /app

COPY app.js .

RUN deno cache app.js

COPY . .

CMD [ "run", "--allow-env", "--allow-net", "--allow-read", "--watch", "--unstable", "app.js" ]
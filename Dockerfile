FROM denoland/deno:alpine-1.29.2

EXPOSE 7777

WORKDIR /app

RUN deno cache deps.js

COPY . .

COPY deps.js .

CMD [ "run", "--allow-env", "--allow-net", "--allow-read", "--watch", "--unstable", "app.js" ]
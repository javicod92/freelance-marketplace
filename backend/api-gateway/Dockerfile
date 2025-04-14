FROM node:latest

WORKDIR /app

COPY . .

RUN npm install -g pnpm && pnpm install

EXPOSE 3000

CMD ["pnpm", "dev"]

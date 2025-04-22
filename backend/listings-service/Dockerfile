# Usamos Node LTS
FROM node:latest

# Creamos directorio de trabajo
WORKDIR /app

# Copiamos el codigo
COPY . .

# Instalamos dependencias
RUN npm install -g pnpm && pnpm install

# Build Prisma Client
RUN pnpm generate

# Exponemos el puerto
EXPOSE 5002

# Comando de inicio
CMD ["pnpm", "dev"]

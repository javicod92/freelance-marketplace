# Usamos Node LTS
FROM node:latest

# Creamos directorio de trabajo
WORKDIR /app

# Copia SOLO los archivos necesarios para instalar dependencias
COPY package.json ./


# Instalamos dependencias
RUN npm install -g pnpm && pnpm install --prod

# Copiamos el codigo
COPY . .

# Build Prisma Client
RUN pnpm prisma generate

# Exponemos el puerto
EXPOSE 5002

# Comando de inicio
CMD ["pnpm", "start"]

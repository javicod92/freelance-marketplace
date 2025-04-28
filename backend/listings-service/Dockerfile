# Usamos Node LTS
FROM node:latest

# Copiar shared fuera de app
COPY shared/ ./shared

# Creamos directorio de trabajo
WORKDIR /app

# Copiar SOLO el package.json de users-service + la carpeta shared
COPY listings-service/package.json ./

# Instalar dependencias (si quieres todas, quita el --prod)
RUN npm install -g pnpm && pnpm install --prod

# Copiamos el codigo
COPY listings-service ./

# Build Prisma Client
RUN pnpm prisma generate

# Exponemos el puerto
EXPOSE 5002

# Comando de inicio
CMD ["pnpm", "start"]

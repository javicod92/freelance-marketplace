# Usa la imagen oficial de Node.js
FROM node:latest

# Copiar shared fuera de app
COPY shared/ ./shared

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar SOLO el package.json de users-service + la carpeta shared
COPY users-service/package.json ./

# Instalar dependencias (si quieres todas, quita el --prod)
RUN npm install -g pnpm && pnpm install --prod

# Copia el resto del código de users-service
COPY users-service/ ./

# Genera Prisma Client
RUN pnpm prisma generate

# Expone el puerto
EXPOSE 5001

# Comando de arranque
CMD ["pnpm", "start"]

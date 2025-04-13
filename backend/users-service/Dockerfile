# Usa la imagen oficial de Node.js
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# 1. Copia SOLO los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala dependencias dentro del contenedor
RUN npm install -g pnpm && pnpm install

# 3. Ahora copia el resto del proyecto
COPY . .

# Generamos Prisma Client e inicializamos la base de datos
RUN pnpm generate

# Expón el puerto
EXPOSE 3001

CMD ["pnpm", "dev"]
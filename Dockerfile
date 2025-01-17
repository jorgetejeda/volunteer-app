# Etapa de construcción
FROM node:18-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Mensaje informativo sobre la copia de package.json
RUN echo "Copiando archivos package.json..."
COPY package*.json ./

# Instala las dependencias necesarias
RUN echo "Instalando dependencias..."
RUN npm install --legacy-peer-deps

# Copia el código fuente al contenedor
RUN echo "Copiando el código fuente..."
COPY . .

# Genera la aplicación para producción
RUN echo "Generando la aplicación para producción..."
RUN npm run build

# Etapa final (más ligera)
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Mensaje informativo sobre la copia de archivos desde la etapa de construcción
RUN echo "Copiando archivos necesarios desde la etapa de construcción..."

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Mensaje informativo sobre la exposición del puerto
RUN echo "Exponiendo el puerto 3000 para la aplicación Next.js..."
EXPOSE 3000

# Comando por defecto para iniciar la aplicación
CMD ["npm", "run", "start"]

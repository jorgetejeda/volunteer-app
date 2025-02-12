# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copia package.json e instala dependencias
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copia el código fuente y construye la aplicación
COPY . .
RUN npm run build

# Etapa final (más ligera)
FROM node:18-alpine AS runner

WORKDIR /app

# Copia solo los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Define la variable de entorno para producción
ENV NODE_ENV=production

# Usa npm para ejecutar el servidor en lugar de llamar directamente a `next`
CMD ["npm", "run", "start"]

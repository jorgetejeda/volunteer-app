# ========================
# 🛠️ Etapa de construcción
# ========================
FROM node:18-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install --legacy-peer-deps

# Copia el resto del proyecto
COPY . .

# Compila la aplicación
RUN npm run build

# ======================
# 🚀 Etapa de ejecución
# ======================
FROM node:18-alpine AS runner

WORKDIR /app

# Copia el servidor standalone generado por Next.js
COPY --from=builder /app/.next/standalone ./

# Copia los archivos estáticos necesarios
COPY --from=builder /app/.next/static ./.next/static

# Copia la carpeta public para servir activos
COPY --from=builder /app/public ./public

# Configura entorno de producción
ENV NODE_ENV=production

# Expone el puerto en el que Next.js corre por defecto
EXPOSE 3000

# Comando por defecto: inicia el servidor
CMD ["node", "server.js"]

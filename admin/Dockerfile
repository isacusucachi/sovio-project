# Dockerfile para Frontend Admin
FROM node:22.21.1-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto de Vite
EXPOSE 5174

# El comando se define en docker-compose.yml
CMD ["npm", "run", "dev", "--", "--host", "--port", "5174"]
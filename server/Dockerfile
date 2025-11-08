# Dockerfile para Backend
FROM node:22.21.1-alpine

# Instalar bash para mejor debugging
RUN apk add --no-cache bash

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 3000

# El comando se define en docker-compose.yml para usar nodemon
CMD ["npm", "run", "dev"]
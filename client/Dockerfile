# Phase 1. - Build
FROM node:20-alpine AS builder

WORKDIR /app

# Ici on copie le package.json et le package-lock.json
# en premier pour tirer avantage de la cache. Si les dépendances
# n'ont pas changées, on ne réinsalle pas tout le node_modules pour rien.
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Phase 2. - Serve
FROM node:20-alpine

WORKDIR /app

# On install seulement serve, pas besoin du node_modules complet
RUN npm install -g serve

# On copie le dossier dist qui contient le build l'application React
COPY --from=builder /app/dist ./dist

EXPOSE 4321

# On sert le ficher index.html par défaut
CMD ["serve", "-s", "dist", "-l", "4321"]
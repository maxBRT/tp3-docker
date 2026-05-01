FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Generate Prisma client, run migrations, then start
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma generate && npm run start"]
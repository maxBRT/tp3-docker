FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

# Run migrations, then start the compiled app
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma generate && npx tsx dist/src/index.js"]

FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
RUN npm cache clean --force && rm -rf /tmp/*
CMD [ "npm", "start" ]

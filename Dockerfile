# Dockerfile (лежит в корне проекта)
FROM node:18-alpine

WORKDIR /app

# Копируем package.json из папки app/
COPY app/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код из app/
COPY app/ .

# Копируем .env, если он в корне (опционально)
# COPY .env ./          ← раскомментируй, если используешь .env в корне

EXPOSE 3000

CMD ["npm", "start"]
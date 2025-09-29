const express = require('express');
const authRoutes = require('./routes/authRoutes');
const { swaggerUi, specs } = require('./swagger');
const app = express();
const port = 3000;

// Middleware для парсинга JSON
app.use(express.json());

// Подключаем Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Подключаем роуты
app.use('/api', authRoutes);

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
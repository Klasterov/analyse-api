const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * Настройки Swagger.
 */
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js API with JWT Authentication',
      version: '1.0.0',
      description: 'API для авторизации и работы с пользователями с использованием JWT.',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js', './models/*.js'], // Путь к файлам с аннотациями
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
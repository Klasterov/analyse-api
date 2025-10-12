// src/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
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
  apis: [
    './src/routes/*.js',      
    './src/controllers/*.js', 
    './src/models/*.js'     
  ],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
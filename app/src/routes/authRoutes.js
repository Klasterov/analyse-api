const express = require('express');
const authController = require('../controllers/authController');
const { authenticate } = require('../utils/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     description: Создает нового пользователя в системе.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *       400:
 *         description: Неверный запрос
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Логин пользователя
 *     description: Вход в систему с использованием email и пароля.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Успешный логин и получение токена
 *       401:
 *         description: Неверный email или пароль
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Получить данные профиля пользователя
 *     description: Возвращает информацию о пользователе, если он авторизован.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Данные профиля пользователя
 *       401:
 *         description: Пользователь не авторизован
 */
router.get('/profile', authController.getProfile);

module.exports = router;
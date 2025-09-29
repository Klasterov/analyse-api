const authService = require('../services/authService');
const userService = require('../services/userService');

/**
 * Регистрация нового пользователя
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
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Проверка обязательных полей
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Все поля обязательны для заполнения.' });
  }

  try {
    // Проверка, если пользователь с таким email уже существует
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует.' });
    }

    // Хешируем пароль перед сохранением в базе данных
    const hashedPassword = await authService.hashPassword(password);
    
    // Создаем нового пользователя
    const newUser = await userService.createUser(name, email, hashedPassword);

    return res.status(201).json({
      message: 'Пользователь успешно зарегистрирован.',
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    return res.status(500).json({ message: 'Ошибка при регистрации.' });
  }
};

/**
 * Логин пользователя
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
const login = async (req, res) => {
  const { email, password } = req.body;

  // Проверка обязательных полей
  if (!email || !password) {
    return res.status(400).json({ message: 'Email и пароль обязательны для входа.' });
  }

  try {
    // Ищем пользователя по email
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Неверный email или пароль.' });
    }

    // Проверяем пароль с использованием bcrypt
    const isPasswordValid = await authService.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Неверный email или пароль.' });
    }

    // Генерируем токен для пользователя
    const token = authService.generateToken(user.id);
    return res.status(200).json({ message: 'Успешный логин.', token });
  } catch (error) {
    console.error('Ошибка при логине:', error);
    return res.status(500).json({ message: 'Ошибка при логине.' });
  }
};

/**
 * Получение данных профиля пользователя
 */
const getProfile = async (req, res) => {
  const userId = req.userId; // Получаем id из токена, добавленного в middleware

  try {
    // Ищем пользователя по id
    const user = await userService.findUserById(userId);
    if (!user) {
      return res.status(401).json({ message: 'Пользователь не найден.' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Ошибка при получении профиля:', error);
    return res.status(500).json({ message: 'Ошибка при получении профиля.' });
  }
};

module.exports = { register, login, getProfile };

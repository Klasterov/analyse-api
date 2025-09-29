const userService = require('../services/userService');

/**
 * Обновить данные пользователя
 */
const updateUser = async (req, res) => {
  const { name, email } = req.body;
  const userId = req.userId;

  try {
    const updatedUser = await userService.updateUser(userId, { name, email });
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка при обновлении пользователя.' });
  }
};

module.exports = { updateUser };
const bcrypt = require('bcryptjs');

let users = []; // Временное хранилище пользователей

/**
 * Создание нового пользователя
 */
const createUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, name, email, password: hashedPassword };
  users.push(newUser);
  return newUser;
};

/**
 * Поиск пользователя по email
 */
const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

/**
 * Поиск пользователя по id
 */
const findUserById = (id) => {
  return users.find(user => user.id === id);
};

/**
 * Обновление данных пользователя
 */
const updateUser = async (id, data) => {
  const user = users.find(u => u.id === id);
  if (!user) throw new Error('Пользователь не найден.');

  user.name = data.name || user.name;
  user.email = data.email || user.email;

  return user;
};

module.exports = { createUser, findUserByEmail, findUserById, updateUser };
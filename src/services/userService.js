const pool = require('../db');
const bcrypt = require('bcryptjs');

const createUser = async (name, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Ошибка в createUser:', error);
    throw error;
  }
};

const findUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query(
    'SELECT id, name, email FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

const updateUser = async (id, data) => {
  const fields = [];
  const values = [id];

  if (data.name) {
    fields.push(`name = $${values.length + 1}`);
    values.push(data.name);
  }
  if (data.email) {
    fields.push(`email = $${values.length + 1}`);
    values.push(data.email);
  }

  const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $1 RETURNING id, name, email`;

  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
};

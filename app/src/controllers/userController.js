const pool = require('../db');
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

  if (fields.length === 0) {
    throw new Error('Нет данных для обновления');
  }

  const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $1 RETURNING id, name, email`;

  const result = await pool.query(query, values);
  return result.rows[0];
};

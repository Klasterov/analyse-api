const db = require('../db');  // Здесь будет подключение к базе данных

class MeterReadingsService {
  // Создание показания
  async create(data) {
    const { user_id, month, previous_value, current_value, difference } = data;
    const result = await db.query(
      `INSERT INTO meter_readings (user_id, month, previous_value, current_value, difference)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, month, previous_value, current_value, difference]
    );
    return result.rows[0];
  }

  // Получение всех показаний
  async getAll() {
    const result = await db.query('SELECT * FROM meter_readings');
    return result.rows;
  }

  // Обновление показания
  async update(id, data) {
    const { month, previous_value, current_value, difference } = data;
    const result = await db.query(
      `UPDATE meter_readings SET month=$1, previous_value=$2, current_value=$3, difference=$4 WHERE id=$5 RETURNING *`,
      [month, previous_value, current_value, difference, id]
    );
    return result.rows[0];
  }

  // Удаление показания
  async delete(id) {
    const result = await db.query('DELETE FROM meter_readings WHERE id=$1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = new MeterReadingsService();

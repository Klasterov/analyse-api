exports.up = async (pgm) => {
  // 1️⃣ Таблица пользователей
  pgm.createTable('users', {
    id: 'id',
    name: { type: 'varchar(100)', notNull: true },
    email: { type: 'varchar(100)', notNull: true, unique: true },
    password: { type: 'text', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });

  // 2️⃣ Таблица показаний счетчиков
  pgm.createTable('meter_readings', {
    id: 'id',
    user_id: {
      type: 'integer',
      notNull: true,
      references: 'users',
      onDelete: 'cascade',
    },
    month: { type: 'varchar(20)', notNull: true },
    previous_value: { type: 'numeric', notNull: true, default: 0 },
    current_value: { type: 'numeric', notNull: true },
    difference: { type: 'numeric', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });

  // 3️⃣ Индекс для быстрого поиска (уникально по пользователю и месяцу)
  pgm.createIndex('meter_readings', ['user_id', 'month'], { unique: true });

  // 4️⃣ Пример вставки тестового пользователя
  const result = await pgm.sql(`
    INSERT INTO users (name, email, password)
    VALUES ('Test User', 'test@example.com', 'password123')
    RETURNING id;
  `);

  const userId = result.rows[0].id;

  // 5️⃣ Пример вставки первого показания за прошлый месяц
  await pgm.sql(`
    INSERT INTO meter_readings (user_id, month, previous_value, current_value, difference)
    VALUES (${userId}, '2025-09', 0, 100, 100);
  `);
};

exports.down = async (pgm) => {
  pgm.dropTable('meter_readings');
  pgm.dropTable('users');
};

require('dotenv').config();
const migrate = require('node-pg-migrate');

async function runMigrations() {
  try {
    await migrate({
      dir: 'migrations',
      direction: 'up',
      log: () => {},
    });
    console.log('Миграции выполнены успешно');
  } catch (error) {
    console.error('Ошибка при миграциях:', error);
  }
}

runMigrations();

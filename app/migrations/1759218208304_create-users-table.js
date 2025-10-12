exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    name: { type: 'varchar(100)', notNull: true },
    email: { type: 'varchar(100)', notNull: true, unique: true },
    password: { type: 'text', notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};


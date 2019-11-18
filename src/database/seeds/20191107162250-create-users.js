const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          name: 'Léu Almeida',
          email: 'leo@webid.net.br',
          password_hash: bcrypt.hashSync('admin', 8),
          provider: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Usuário Lorem',
          email: 'eu@leunardo.dev',
          password_hash: bcrypt.hashSync('admin', 8),
          provider: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};

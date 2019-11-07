import bcrypt from 'bcryptjs'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          name: 'Léu Almeida',
          email: 'leo@webid.net.br',
          password: bcrypt('admin', 8),
          provider: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          name: 'Usuário Lorem',
          email: 'eu@leunardo.dev',
          password: bcrypt('admin', 8),
          provider: false,
          created_at: new Date(),
          updated_at: new Date()
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};

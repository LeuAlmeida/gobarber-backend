module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'files',
      [
        {
          id: 1,
          name: 'leu-almeida.jpeg',
          path: '942f80d1828b3053a1bb1682a69b288d.jpeg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'avatar-placeholder.JPEG',
          path: 'f56d9ef8097628f613eed416d645e21c.JPEG',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('files', null, {});
  },
};

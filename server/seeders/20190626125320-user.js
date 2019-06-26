

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    email: 'tunde@mail.com',
    password: 'secret',
    firstName: 'Tunde',
    lastName: 'Yakub',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('User', null, {})
};

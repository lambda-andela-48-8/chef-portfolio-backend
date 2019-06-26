

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Recipes', [{
    title: 'Borito',
    image: 'http',
    mealType: 'Lunch',
    ingredients: ['maggi', 'onions', 'chicked'],
    instructions: 'Boil for one hour',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Recipes', null, {})
};

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    mealType: DataTypes.STRING,
    ingredients: DataTypes.ARRAY(DataTypes.STRING),
    instructions: DataTypes.STRING

  }, {});
  Recipe.associate = (models) => {
    // associations can be defined here
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'chefId'
    });
  };
  return Recipe;
};

import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      country: DataTypes.STRING,
      state: DataTypes.STRING,
    },
    {},
  );
  User.prototype.encryptPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  User.prototype.comparePassword = (password, user) => bcrypt.compareSync(password, user.password);

  User.beforeCreate((user) => {
    user.password = user.encryptPassword(user.password);
  });
  User.beforeUpdate((user) => {
    user.password = user.encryptPassword(user.password);
  });

  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Recipe, { foreignKey: 'userId', as: 'recipes' }, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  };
  return User;
};

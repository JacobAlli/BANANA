'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    user_type: DataTypes.STRING,
    address: DataTypes.STRING,
    zipcode: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.SalesOrder)
      }
    }
  });
  return User;
};
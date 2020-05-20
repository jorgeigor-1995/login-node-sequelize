const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
    static init(sequelize) {
        super.init({
          fullName: DataTypes.STRING,
          email: DataTypes.STRING,
          password: DataTypes.STRING,
          active: DataTypes.BOOLEAN
        }, {
            sequelize,
         //   modelName: 'user'
        })
    }

  }

  module.exports = Usuario;



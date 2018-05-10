
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    nickname: {
      type: DataTypes.STRING,
      field: 'nickname'
    },
    email: {
      type: DataTypes.STRING,
      field: 'email'
    }
  }, {
    tableName: 'users',
    timestamps: true
  });

  return User;
};

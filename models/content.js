
module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define('Content', {
    id: {
      type: DataTypes.BIGINT,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      field: 'title'
    },
    text: {
      type: DataTypes.STRING,
      field: 'text'
    },
    userId: {
      type: DataTypes.BIGINT,
      field: 'userId'
    }
  }, {
    tableName: 'contents',
    timestamps: true
  });

  Content.associate = (models) => {
    Content.belongsTo(models.User, {
      as: 'user'
    });
  };

  return Content;
};

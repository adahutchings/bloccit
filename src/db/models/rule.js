'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rule = sequelize.define('Rule', {
    description: DataTypes.STRING,
    topicIdRule: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "Topics",
        key: "id",
        as: "topicIdRule",
      }
    }
  }, {});
  Rule.associate = function(models) {
    Rule.belongsToMany(models.Topic, {
      through: "topicIdRule"
    });
  };
  return Rule;
};
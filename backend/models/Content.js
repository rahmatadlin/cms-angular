'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    static associate(models) {
      // define associations here
      Content.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator'
      });
      Content.belongsTo(models.User, {
        foreignKey: 'updatedBy',
        as: 'updater'
      });
    }
  }

  Content.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 200]
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [1, 200]
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('page', 'post', 'section'),
      defaultValue: 'post',
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      defaultValue: 'draft',
      allowNull: false
    },
    featuredImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    metaTitle: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 60]
      }
    },
    metaDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 160]
      }
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Content',
    tableName: 'contents',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['slug']
      },
      {
        fields: ['status']
      },
      {
        fields: ['type']
      },
      {
        fields: ['isPublic']
      }
    ]
  });

  return Content;
}; 
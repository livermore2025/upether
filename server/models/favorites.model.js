'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Favorite extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Favorite.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        coin_uuid: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
            unique: true,
        }
    }, {
        sequelize,
        timestamps: true,
        modelName: 'favorites',
        paranoid: true,
    });
    return Favorite;
};
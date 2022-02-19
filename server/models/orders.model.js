'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Order.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        side: {
            type: DataTypes.UUID,
        },
        ord_type: {
            type: DataTypes.UUID,
        },
        price: {
            type: DataTypes.UUID,
        },
        state: {
            type: DataTypes.UUID,
        },
        market: {
            type: DataTypes.UUID,
        },
        volume: {
            type: DataTypes.UUID,
        },
        remaining_volume: {
            type: DataTypes.UUID,
        },
        locked: {
            type: DataTypes.UUID,
        },
        executed_volume: {
            type: DataTypes.UUID,
        },
    }, {
        sequelize,
        timestamps: true,
        modelName: 'orders',
        paranoid: true,
    });
    return Order;
};
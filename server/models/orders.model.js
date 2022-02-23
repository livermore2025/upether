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
            this.belongsTo(models.users, { foreignKey: 'user_uuid', targetKey: 'uuid' });
        }
    }
    Order.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        side: {
            type: DataTypes.STRING(255),
        },
        ord_type: {
            type: DataTypes.STRING(255),
        },
        price: {
            type: DataTypes.STRING(255),
        },
        state: {
            type: DataTypes.STRING(255),
        },
        market: {
            type: DataTypes.STRING(255),
        },
        volume: {
            type: DataTypes.STRING(255),
        },
        remaining_volume: {
            type: DataTypes.STRING(255),
        },
        locked: {
            type: DataTypes.STRING(255),
        },
        executed_volume: {
            type: DataTypes.STRING(255),
        },
    }, {
        sequelize,
        timestamps: true,
        modelName: 'orders',
        paranoid: true,
    });
    return Order;
};
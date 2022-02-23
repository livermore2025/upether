'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Account extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.users, { foreignKey: 'user_uuid', targetKey: 'uuid' });
        }
    }
    Account.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        currency: {
            type: DataTypes.STRING(255),
        },
        balance: {
            type: DataTypes.STRING(255),
        },
        locked: {
            type: DataTypes.STRING(255),
        },
        avg_buy_price: {
            type: DataTypes.STRING(255),
        },
    }, {
        sequelize,
        timestamps: true,
        modelName: 'accounts',
        paranoid: true,
    });
    return Account;
};
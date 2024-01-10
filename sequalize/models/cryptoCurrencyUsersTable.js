const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('crypto_currency_users', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        currency_id: {
            type: DataTypes.JSON,
            allowNull: false,
            unique: true,
        },
        user_id: {
            type: DataTypes.INTEGER(100),
            allowNull: false,
            unique: true,
        },
    }, {
        // sequelize,
        modelName: 'cryptoCurrencyUser',
        tableName: 'crypto_currency_user',
        timestamps: true
    }
    );
};
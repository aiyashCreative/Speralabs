const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('crypto_currencies', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        currency_id: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        price: {
            type: DataTypes.FLOAT(8, 2),
            allowNull: false,
            unique: false,
        },
    }, {
        // sequelize,
        modelName: 'cryptoCurrency',
        tableName: 'crypto_currencies',
        timestamps: true
    }
    );
};
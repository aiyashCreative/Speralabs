const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('users', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
        },
        firstname: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: false,
        },
        lastname: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
    }, {
        // sequelize,
        modelName: 'user',
        tableName: 'user',
        timestamps: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                ]
            },
        ]
    }
    );
};
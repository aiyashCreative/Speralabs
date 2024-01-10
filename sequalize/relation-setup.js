function relationSetup(sequelize) {
    const {
        users,
        crypto_currencies: cryptoCurrencies,
        crypto_currency_users: cryptoCurrencyUsers

    } = sequelize.models;


    users.hasMany(cryptoCurrencyUsers, {
        foreignKey: 'user_id'
    })

    cryptoCurrencyUsers.belongsTo(users, {
        foreignKey: 'user_id'
    })

}

module.exports = { relationSetup };
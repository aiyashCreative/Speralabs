const sequelize = require("../../../sequalize")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
    successReturnHandler,
    errorReturnHandler,
} = require("../general/httpResponseHandler");

const { crypto_currency_users: cryptoCurrencyUsers } = sequelize.models
const cryptoCurrencyUserModel = cryptoCurrencyUsers

const create = async (userId, currencies) => {
    try {
        return await cryptoCurrencyUserModel.create({ user_id: userId, currency_id: currencies })
            .then(async data => {
                const currencyData = data.dataValues

                return successReturnHandler("Currencies added!", currencyData)
            }).catch(error => errorReturnHandler("Currencies are failed to add", error))
    } catch (error) {
        return errorReturnHandler("Currencies are failed to add", error)
    }
}

const update = async (userId, currencies) => {
    try {
        await cryptoCurrencyUserModel.destroy({ where: { user_id: userId } })

        return await cryptoCurrencyUserModel.create({ user_id: userId, currency_id: currencies })
            .then(async data => {
                const currencyData = data.dataValues

                return successReturnHandler("Currencies updated!", currencyData)
            }).catch(error => errorReturnHandler("Currencies are failed to updated", error))
    } catch (error) {
        return errorReturnHandler("Currencies are failed to updated", error)
    }
}

const destroy = async (id) => {
    try {
        return await cryptoCurrencyUserModel
            .destroy({
                where: { id }
            })
            .then(async (data) => {
                if (data) return successReturnHandler("Deleted Successfully")
                else return errorReturnHandler("Something went wrong");
            })
            .catch((error) => {
                return errorReturnHandler("Delete Failed!", error);
            });
    } catch (error) {
        return errorReturnHandler("Delete Failed!", error);
    }
}

module.exports = {
    create,
    update,
    delete: destroy
}
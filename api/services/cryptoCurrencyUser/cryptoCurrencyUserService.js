const cryptoCurrencyUserController = require("../../controllers/cryptoCurrencyUser/cryptoCurrencyUserController")
const {
    resErrorHandlerService,
    resSuccessHandlerService,
} = require("../general/responseServices");

const create = async (req, res) => {
    try {
        const userId = req.params.id
        const currencies = req.body.currencies
        return await cryptoCurrencyUserController.create(userId, currencies)
            .then(response => {
                if (response.result) {
                    return resSuccessHandlerService(res, "Currencies added!", response)
                } else return resErrorHandlerService(res, response.message, response)
            }).catch(error => {
                return resErrorHandlerService(res, "Currencies are failed to create!", error)
            })
    } catch (error) {
        return resSuccessHandlerService(res, "Currencies are failed to create!", error)
    }
}

const update = async (req, res) => {
    try {
        const userId = req.params.id
        const currencies = req.body.currencies
        return await cryptoCurrencyUserController.update(userId, currencies)
            .then(response => {
                if (response.result) {
                    return resSuccessHandlerService(res, "Currencies updated!", response)
                } else return resErrorHandlerService(res, response.message, response)
            }).catch(error => {
                return resErrorHandlerService(res, "Currencies are failed to update!", error)
            })
    } catch (error) {
        return resSuccessHandlerService(res, "Currencies are failed to update!", error)
    }
}

const destroy = async (req, res) => {
    try {
        const userId = req.params.id
        const currencies = req.body.currencies
        return await cryptoCurrencyUserController.delete(userId, currencies)
            .then(response => {
                if (response.result) {
                    return resSuccessHandlerService(res, "Currencies deleted!", response)
                } else return resErrorHandlerService(res, response.message, response)
            }).catch(error => {
                return resErrorHandlerService(res, "Currencies are failed to delete!", error)
            })
    } catch (error) {
        return resSuccessHandlerService(res, "Currencies are failed to delete!", error)
    }
}

module.exports = {
    create,
    update,
    delete: destroy
}
const userController = require("../../controllers/users/userController")
const {
    resErrorHandlerService,
    resSuccessHandlerService,
} = require("../general/responseServices");

const login = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        return await userController
            .login(email, password)
            .then((response) => {
                if (response.result) {
                    return resSuccessHandlerService(res, "Login success!", response);
                } else {
                    return resErrorHandlerService(
                        res,
                        response.message,
                        response
                    );
                }
            })
            .catch((error) => {
                return resErrorHandlerService(res, "Login failed!", error);
            });
    } catch (error) {
        return resErrorHandlerService(res, "Login failed!", error);
    }
};

const register = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const firstname = req.body.firstname
        const lastname = req.body.lastname

        return await userController
            .register(email, password, firstname, lastname)
            .then((response) => {
                if (response.result) {
                    return resSuccessHandlerService(res, "Register success!", response);
                } else {
                    return resErrorHandlerService(
                        res,
                        response.message,
                        response
                    );
                }
            })
            .catch((error) => {
                return resErrorHandlerService(res, "Register failed!", error);
            });
    } catch (error) {
        return resErrorHandlerService(res, "Register failed!", error);
    }
}

const update = async (req, res) => {
    try {
        const email = req.body.email
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const userId = req.params.id

        return await userController
            .update(email, firstname, lastname, userId)
            .then((response) => {
                if (response.result) {
                    return resSuccessHandlerService(res, response.message, response);
                } else {
                    return resErrorHandlerService(
                        res,
                        response.message,
                        response
                    );
                }
            })
            .catch((error) => {
                return resErrorHandlerService(res, response.message, error);
            });
    } catch (error) {
        return resErrorHandlerService(res, "Update failed!", error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id

        return await userController
            .delete(userId)
            .then((response) => {
                if (response.result) {
                    return resSuccessHandlerService(res, response.message, response);
                } else {
                    return resErrorHandlerService(
                        res,
                        response.message,
                        response
                    );
                }
            })
            .catch((error) => {
                return resErrorHandlerService(res, response.message, error);
            });
    } catch (error) {
        return resErrorHandlerService(res, "Delete failed!", error);
    }
}

module.exports = {
    login,
    register,
    update,
    deleteUser
}
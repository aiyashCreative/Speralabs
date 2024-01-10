const sequelize = require("../../../sequalize")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
    successReturnHandler,
    errorReturnHandler,
} = require("../general/httpResponseHandler");

const { users } = sequelize.models
const userModel = users

const generateClientAuthToken = async (userId) => {
    return await userModel
        .findOne({
            where: {
                id: userId,
            },
        })
        .then(async (data) => {
            let email = data.dataValues.email;
            let jwtToken = jwt.sign(
                {
                    userId,
                    email,
                },
                process.env.USER_TOKEN_KEY
            );

            return jwtToken;
        })
        .catch((error) => {
            return false;
        });
};

const login = async (email, password) => {
    try {
        return await userModel
            .findOne({
                where: {
                    email: email,
                },
            })
            .then(async (data) => {
                if (data) {
                    let userId = data.dataValues.id
                    let email = data.dataValues.email;
                    let passwordAtDb = data.dataValues.password;
                    let firstname = data.dataValues.firstname;
                    let lastname = data.dataValues.lastname;

                    const match = await bcrypt.compare(password, passwordAtDb);

                    if (match) {
                        let jwtToken = await generateClientAuthToken(userId);
                        // console.log("JWT-TOKEN", jwtToken)
                        // const userProfile = await profile(userId)
                        const loginData = {
                            token: jwtToken,
                            userId,
                            email,
                            firstname,
                            lastname,
                        };
                        return successReturnHandler(
                            "You have logged in successfully",
                            loginData
                        );
                    } else {
                        return errorReturnHandler("Incorrect Password");
                    }
                } else {
                    return errorReturnHandler("Incorrect email or User not exist");
                }
            })
            .catch((error) => {
                return errorReturnHandler("Login Failed");
            });
    } catch (error) {
        return errorReturnHandler("Login Failed");
    }
};

const passwordHash = async (password) => {
    const salt = await bcrypt.genSalt();
    //hashing the password
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
};

const register = async (email, password, firstname, lastname) => {
    const hashedPassword = await passwordHash(password)
    try {
        return await userModel
            .create({ email, firstname, lastname, password: hashedPassword })
            .then(async (data) => {
                if (data) {
                    let userId = data.dataValues.id
                    let email = data.dataValues.email;
                    let firstname = data.dataValues.firstname;
                    let lastname = data.dataValues.lastname;

                    const registerData = {
                        userId,
                        email,
                        firstname,
                        lastname,
                    };

                    return successReturnHandler(
                        "Registered Successfully",
                        registerData
                    );
                } else {
                    return errorReturnHandler("Something went wrong");
                }
            })
            .catch((error) => {
                return errorReturnHandler("Register Failed", error);
            });
    } catch (error) {
        return errorReturnHandler("Register Failed", error);
    }
}

const update = async (email, firstname, lastname, userId) => {
    try {
        return await userModel
            .update({ email, firstname, lastname }, {
                where: { id: userId }
            })
            .then(async (data) => {
                if (data) {
                    const registerData = {
                        userId,
                        email,
                        firstname,
                        lastname,
                    };

                    return successReturnHandler(
                        "Updated Successfully",
                        registerData
                    );
                } else {
                    return errorReturnHandler("Something went wrong");
                }
            })
            .catch((error) => {
                return errorReturnHandler("Update Failed", error);
            });
    } catch (error) {
        return errorReturnHandler("Update Failed", error);
    }
}

const destroy = async (userId) => {
    try {
        return await userModel
            .destroy({
                where: { id: userId }
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
    login,
    register,
    update,
    delete: destroy,
};
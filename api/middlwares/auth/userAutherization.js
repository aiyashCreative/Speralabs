const jwt = require('jsonwebtoken')
const sequelize = require('../../../sequalize')
const { users } = sequelize.models

module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1]

            jwt.verify(token, process.env.USER_TOKEN_KEY, async (err, decodedToken) => {
                if (err) return res.status(401).json({ message: "Authentication Fail!" })
                else {
                    const userId = decodedToken.userId

                    if (userId) {
                        const isUserExist = users.findOne({
                            where: {
                                id: userId
                            }
                        })

                        if (isUserExist) next()
                        else return res.status(401).json({ message: "Authentication Failed - No user exist" })
                    } else return res.status(401).json({ message: "Authentication Fail!" })
                }
            })
        } else return res.status(401).json({ message: "Authentication Fail!" })
    } catch (error) {
        res.status(401).json({ message: "Authentication Fail!" })
    }
}
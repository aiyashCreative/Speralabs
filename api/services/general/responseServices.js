const resSuccessHandlerService = (res, message = "Success", data = null) => {
    const responseObj = {}
    let statusCode = 200

    responseObj.message = message
    responseObj.status = true

    if (data && data.message) responseObj.message = data.message
    if (data && data.status) responseObj.status = data.status

    if (data) responseObj.data = data

    return res.status(statusCode).json(responseObj)
}

const resErrorHandlerService = (res, message = "Failed in action - Error Handler", error = null) => {
    const responseObj = {}
    let statusCode = 400

    responseObj.message = message
    responseObj.status = false

    if (error && error.message) responseObj.message = error.message
    if (error && error.status) responseObj.status = error.status
    if (error) responseObj.error = error.errors
    

    return res.status(statusCode).json(responseObj)
}

module.exports = {
    resErrorHandlerService,
    resSuccessHandlerService,
};
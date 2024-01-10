

const successReturnHandler = (message = "Success", data = null, options = null) => {

    let responseObj = { result: true };
    responseObj.message = message;
    responseObj.status = true;

    if (data) {
        responseObj.data = data;
    }

    return responseObj;
}

const errorReturnHandler = (message = "Failed in action - Error Handler", error = null) => {

    let responseObj = { result: false };
    responseObj.message = message;
    responseObj.status = false;

    if (error != null) {
        responseObj.error = error;

        // console.log("error =>", error.errors)

        if (error.errors && error.errors.length > 0) {
            const errors = error.errors
            responseObj.errors = []
            // console.log("this errors ", errors[0].ValidationErrorItem)

            for (let i = 0; errors.length > i; i++) {
                // console.log(errors[i].message)
                responseObj.errors.push(errors[i].message)
            }
        }
    }

    return responseObj;
}

module.exports = {
    successReturnHandler,
    errorReturnHandler
}
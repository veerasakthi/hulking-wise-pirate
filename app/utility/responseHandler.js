// @ts-check

/**
 * success response
 *
 * @param {String} msg the message code that is to be returned
 * @param {Object} data that contains the response data
 * @return {any} response object
 */
 function success(msg, data) {

    // result object contains statuscode, status, message, result obj
    let result = new Object({
        statusCode: 200,
        status: "success",
        isError: false,
        message : msg,
        data : data
    });

    // return common result
    return result;
}

/**
 * error response
 *
 * @param {String} msg the message code that is to be returned
 * @param {Object} data that contains the response data
 * @return {any} response object
 */
function error(msg, data) {

    // result object contains statuscode, status, message, result obj
    let result = new Object({
        statusCode: 200,
        status: "error",
        isError : true,
        message : msg,
        data : data
    });

    // return common result
    return result;
}

module.exports = {
    success,
    error
};

// @ts-check

/**
 * errorHandler
 *
 * @param {any} error error
 * @param {any} req http request
 * @param {any} res http response
 * @param {any} next pass control to the next middleware
 * @return {any} response error
 */
 function errorHandler(error, req, res, next) {

    console.error("## ERROR OCCURED...");
    console.error(error);

}

module.exports = errorHandler;

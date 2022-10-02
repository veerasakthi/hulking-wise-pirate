// @ts-check
const path = require('path');
const _service = require('../service/putSantaLetterService');
const { asyncCatch } = require('../utility/appUtils');

/**
 * init
 *
 * @param {any} req http request
 * @param {any} res http response
 * @param {any} next pass control to the next middleware
 * @return {any} response to api gateway
 */
const init = asyncCatch(async (req, res, next) => {

    const result = await _service.putSantaLetter(req, next);

    // return response
    return res.status(200).json(result);

});

module.exports = {
    init
}

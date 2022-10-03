// @ts-check
const path = require('path');
const _service = require('../service/santaMailService');
const { asyncCatch } = require('../../utility/appUtils');

/**
 * init
 *
 * @param {any} req http request
 * @param {any} res http response
 * @param {any} next pass control to the next middleware
 * @return {any} response to api gateway
 */
const init = asyncCatch(async (req, next) => {

    const result = await _service.putSantaMail(req, next);

    console.log(result + new Date());

});

module.exports = {
    init
}

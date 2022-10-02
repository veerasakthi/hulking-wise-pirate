// @ts-check
"use strict";
const path = require('path');
const { transaction } = require('../utility/appUtils');

/**
 * getAllMasterService
 *
 * @param {any} req http request
 * @return {any} santa gift response
 */
const putSantaLetter = transaction(async (req) => {

    console.log(req.body);

    return "data fail";

});

module.exports = {
    putSantaLetter
}

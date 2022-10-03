// @ts-check
"use strict";
const path = require('path');
const { transaction } = require('../../app/utility/appUtils');

const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

/**
 * putSantaMail
 *
 * @param {any} req http request
 * @return {any} santa gift response
 */
const putSantaMail = transaction(async (req) => {

    console.log("started ###");

    return null;

});

module.exports = {
    putSantaMail
}

// @ts-check
"use strict";
const path = require('path');
const { transaction } = require('../utility/appUtils');

const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

/**
 * getAllMasterService
 *
 * @param {any} req http request
 * @return {any} santa gift response
 */
const putSantaLetter = transaction(async (req) => {

    const reqBody = req.body;

    console.log(reqBody);
    reqBody.emailFlag = 0;

    // input validation
    const validationResult = validationCheck(reqBody);

    if(validationResult?.isError){
        return validationResult;
    }

    let toBeStored = [];
    let santaLetterList = myCache.get( "santaLetters" );

    if(santaLetterList && santaLetterList.length){
        santaLetterList.push(reqBody);
        toBeStored = santaLetterList;
    }else{
        toBeStored = [reqBody];
    }

    let insertResult = myCache.set( "santaLetters", toBeStored );

    if(insertResult){

        let msg = "Dream sent to Santa Successfully!";
        return successResponse(msg, {});
        
    }else{
        let msg = "Error Occurred Sorry!";
        return errorResponse(msg, {});
    }

});


function validationCheck(reqBody){

    const userName = reqBody.userName;
    const wish = reqBody.wish;

    if(!userName || !wish){
        let msg = "userName or wish cannot be Empty!";
        return errorResponse(msg, {});
    }

}

function successResponse(msg, data){
    return {
        isError : false,
        message : msg,
        data : data
    }
}

function errorResponse(msg, data){
    return {
        isError : true,
        message : msg,
        data : data
    }
}

module.exports = {
    putSantaLetter
}

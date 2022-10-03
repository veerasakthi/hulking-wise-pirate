// @ts-check
"use strict";
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


let usersList = JSON.parse(fs.readFileSync('app/resource/users.json', 'utf8'));
let profileList = JSON.parse(fs.readFileSync('app/resource/userProfiles.json', 'utf8'));

const { transaction } = require('../../utility/appUtils');
const _CONSTANTS = require('../../utility/constants');
const response = require('../../utility/responseHandler');

const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

/**
 * putSantaLetter
 *
 * @param {any} req http request
 * @return {any} santa gift response
 */
const putSantaLetter = transaction(async (req) => {

    // assign request body to a variable
    const reqBody = req.body;

    // email process flag set to 0
    reqBody.emailFlag = 0;
    // set a unique id to a letter
    reqBody.letterId = uuidv4();

    // input validation
    const inputValidationResult = inputValidationCheck(reqBody);

    if(inputValidationResult?.isError){
        return inputValidationResult;
    }

    // child validation
    const userResult = userValidationCheck(reqBody);

    if(userResult?.isError){
        return userResult;
    }

    // get the existing stored letters and append the new letter and store it in-memory
    let toBeStored = [];
    let santaLetterList = myCache.get(_CONSTANTS.SANTA_LETTER_KEY);

    if(santaLetterList && santaLetterList.length){
        santaLetterList.push(reqBody);
        toBeStored = santaLetterList;
    }else{
        toBeStored = [reqBody];
    }

    // store it in local cache
    let insertResult = myCache.set(_CONSTANTS.SANTA_LETTER_KEY, toBeStored );

    if(insertResult){

        return response.success(_CONSTANTS.DREAM_SENT_TO_SANTA, {});
        
    }else{

        return response.error(_CONSTANTS.ERROR_OCCURED, {});
    }

});

/**
 * inputValidationCheck
 *
 * @param {Object} reqBody request body from user
 * @return {Object} validation response
 */
function inputValidationCheck(reqBody){

    const userName = reqBody.userName;
    const wish = reqBody.wish;

    if(!userName || !wish){

        return response.error(_CONSTANTS.USERNAME_OR_WISH_CANNOT_EMPTY, {});
    }else{

        return response.success("", {});
    }

}

/**
 * userValidationCheck
 *
 * @param {Object} reqBody request body from user
 * @return {Object} validation response
 */
function userValidationCheck(reqBody){

    const userInfo = usersList.find(user => user.username == reqBody.userName);

    // user exist check
    if(userInfo){

        const profileInfo = profileList.find(profile => profile.userUid == userInfo.uid);

        // age validation
        if(getAge(profileInfo.birthdate) <= 10){

            return response.success("", {});

        }else{

            return response.error(_CONSTANTS.CHILD_LESS_THAN_10_YEARS, {});
        }

    }else{
        
        return response.error(_CONSTANTS.USER_DOESNOT_EXIST, {});

    }
    
}

/**
 * getAge
 *
 * @param {String} birthDateString user birthday
 * @return {number} age of the user
 */
function getAge(birthDateString) {

    var today = new Date();
    var birthDate = new Date(birthDateString);
    // calc age based on year
    var age = today.getFullYear() - birthDate.getFullYear();
    // decide age based on month
    var m = today.getMonth() - birthDate.getMonth();
    // further breakdown with dates
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;

}

module.exports = {
    putSantaLetter,
    myCache
}

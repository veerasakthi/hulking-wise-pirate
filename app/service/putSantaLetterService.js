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

    // child validation
    const userResult = userValidationCheck(reqBody);

    if(userResult?.isError){
        return userResult;
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

function userValidationCheck(reqBody){
    const fs = require('fs');

    let usersList = JSON.parse(fs.readFileSync('app/resource/users.json', 'utf8'));
    let profileList = JSON.parse(fs.readFileSync('app/resource/userProfiles.json', 'utf8'));
    // @ts-ignore
    // console.log(usersList);
    // console.log(profileList);

//    const userExist =  usersList.some(function(user) {
//         return user.username == reqBody.userName;
//     }); 

    const userInfo = usersList.find(user => user.username == reqBody.userName);

    if(userInfo){

        const profileInfo = profileList.find(profile => profile.userUid == userInfo.uid);

        if(getAge(profileInfo.birthdate) <= 10){
            return successResponse("", {});
        }else{
            let msg = "child is more than 10years old ";
            return errorResponse(msg, {});
        }

    }else{

        let msg = "user doesn't exist !";
        return errorResponse(msg, {});

    }
    
}

function getAge(birthDateString) {

    var today = new Date();
    var birthDate = new Date(birthDateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;

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

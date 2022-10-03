// @ts-check
"use strict";
const fs = require('fs');
const path = require('path');
const { transaction } = require('../../utility/appUtils');
const _CONSTANTS = require('../../utility/constants');

const { myCache } = require('../../app/service/putSantaLetterService');
const { mailSender } = require('../../utility/mailSender');

let usersList = JSON.parse(fs.readFileSync('app/resource/users.json', 'utf8'));
let profileList = JSON.parse(fs.readFileSync('app/resource/userProfiles.json', 'utf8'));

/**
 * putSantaMail
 *
 * @param {any} req http request
 * @return {any} santa gift response
 */
const putSantaMail = transaction(async (req) => {

    console.log("cron mail started ###");

    // get all santa letters
    let santaLetterList = myCache.get(_CONSTANTS.SANTA_LETTER_KEY);
    
    if(!santaLetterList){
        console.log(_CONSTANTS.NO_EMAILS_TO_PROCESS);
        return "SKIP...";
    }

    // filter the unsent letters to santa
    let unsentLetters = santaLetterList.filter(function (letter) {
        return letter.emailFlag == 0 ;
    });

    if(!unsentLetters){
        console.log(_CONSTANTS.NO_EMAILS_TO_PROCESS);
        return "SKIP...";
    }

    // MAIL SENDING CODE
    unsentLetters.forEach(async letter => {
    
        const userInfo = usersList.find(user => user.username == letter.userName);
        const profileInfo = profileList.find(profile => profile.userUid == userInfo.uid);

        const emailSubject = `wish from child ${userInfo.username}`
        const emailBody = `
        Dear Santa

        wish from child ${userInfo.username} 
        child's address ${profileInfo.address} 

        child's wish is
        ${letter.wish} 

        Thank you...
        -----------------------
        `

        // send email
        await mailSender(emailSubject, emailBody);

    });


    // update email sent flag process
    let latestSantaLetterList = myCache.get(_CONSTANTS.SANTA_LETTER_KEY);  
    
    unsentLetters.forEach(async letter => {
        //Find index of specific object using findIndex method.    
        let objIndex = latestSantaLetterList.findIndex((obj => obj.letterId == letter.letterId));
        
        //Update object's emailFlag property.
        latestSantaLetterList[objIndex].emailFlag = 1;
    })

    // update the cache
    myCache.set(_CONSTANTS.SANTA_LETTER_KEY, latestSantaLetterList );

    return "SUCCESS... ";

});


module.exports = {
    putSantaMail
}

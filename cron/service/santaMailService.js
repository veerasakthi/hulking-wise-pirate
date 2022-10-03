// @ts-check
"use strict";
const fs = require('fs');
const path = require('path');
const mailer = require('nodemailer');
const { transaction } = require('../../app/utility/appUtils');

const { myCache } = require('../../app/service/putSantaLetterService');

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

    let santaLetterList = myCache.get( "santaLetters" );

    if(!santaLetterList){
        console.log("NO EMAILS TO PROCESS!");
        return "SKIP...";
    }

    let unsentLetters = santaLetterList.filter(function (letter) {
        return letter.emailFlag == 0 ;
    });

    if(!unsentLetters){
        console.log("NO EMAILS TO PROCESS!");
        return "SKIP...";
    }

    unsentLetters.forEach(async letter => {
    
    const userInfo = usersList.find(user => user.username == letter.userName);
    const profileInfo = profileList.find(profile => profile.userUid == userInfo.uid);

    // console.log(userInfo);
    // console.log(profileInfo);

    const emailSubject = `wish from child ${userInfo.username}`
    const emailBody = `
    Dear Santa

    wish from child ${userInfo.username} 
    child's address ${profileInfo.address} 

    child's wish is
    ${letter.wish} 

    Thank you...
    -----------------------
    </html>
    `

    // console.log(`
    // ${emailSubject}
    // ${emailBody}
    // `)

    // send email
    await sendEmail(emailSubject, emailBody);

    });


    // update email sent flag process
    let latestSantaLetterList = myCache.get( "santaLetters" );  
    
    unsentLetters.forEach(async letter => {
        //Find index of specific object using findIndex method.    
        let objIndex = latestSantaLetterList.findIndex((obj => obj.letterId == letter.letterId));
        
        //Update object's emailFlag property.
        latestSantaLetterList[objIndex].emailFlag = 1;
    })

    // update the cache
    myCache.set( "santaLetters", latestSantaLetterList );

    return "SUCCESS... ";

});

function sendEmail(subject, body){

    return new Promise(function(resolve, reject) {

        // Creating a transporter
        const transporter = mailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'arely.hauck@ethereal.email',
                pass: 'FDuBZDV7aF5PgtGq2d'
            }
        });

        //sending the email
        transporter.sendMail({
            from: 'do_not_reply@northpole.com',
            to: 'santa@northpole.com',
            subject: subject,
            text: body
        })
        .then(data => { resolve(data) })
        .catch(error => {reject(error)});

    });

}

module.exports = {
    putSantaMail
}

// @ts-check
const path = require('path');
const mailer = require('nodemailer');
const _CONSTANTS = require('../utility/constants');

/**
 * MAIL SENDER
 *
 * @param {any} subject subject of the email
 * @param {any} body body of the email
 * @return {any} mail response
 */
function mailSender(subject, body){

    const EMAIL_PORT = process.env.EMAIL_PORT;
    const EMAIL_HOST = process.env.EMAIL_HOST;
    const EMAIL_AUTH_USER = process.env.EMAIL_AUTH_USER;
    const EMAIL_AUTH_PASS = process.env.EMAIL_AUTH_PASS;
    const EMAIL_FROM = process.env.EMAIL_FROM;
    const EMAIL_TO = process.env.EMAIL_TO;

    if(!EMAIL_PORT 
        || !EMAIL_HOST
        || !EMAIL_AUTH_USER
        || !EMAIL_AUTH_PASS
        || !EMAIL_FROM
        || !EMAIL_TO
        ){
            // throw error when env doesnot exist
            throw new Error(_CONSTANTS.ENVIRONMENT_VARIABLES_NOT_SET);
    }

    return new Promise(function(resolve, reject) {

        // Creating a transporter
        const transporter = mailer.createTransport({
            host: EMAIL_HOST?.toString(),
            port: Number(EMAIL_PORT),
            auth: {
                user: EMAIL_AUTH_USER?.toString(),
                pass: EMAIL_AUTH_PASS?.toString()
            }
        });

        //sending the email
        transporter.sendMail({
            from: EMAIL_FROM?.toString(),
            to: EMAIL_TO?.toString(),
            subject: subject,
            text: body
        })
        .then(data => { resolve(data) })
        .catch(error => {reject(error)});

    });

}

module.exports = {
    mailSender
};


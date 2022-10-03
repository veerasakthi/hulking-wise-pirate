// @ts-check
"use strict";
const path = require('path');
const mailer = require('nodemailer');
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

    await sendEmail("test-sub", "test-body");

    return "success";

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

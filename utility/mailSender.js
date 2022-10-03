// @ts-check
const path = require('path');
const mailer = require('nodemailer');

/**
 * MAIL SENDER
 *
 * @param {any} subject subject of the email
 * @param {any} body body of the email
 * @return {any} mail response
 */
function mailSender(subject, body){

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
    mailSender
};


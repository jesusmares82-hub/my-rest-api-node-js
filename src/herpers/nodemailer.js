require('dotenv').config()
const googleapis = require('googleapis');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const fs = require('fs');
var exphbs = require('express-handlebars');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const Oauth2 = googleapis.google.auth.OAuth2;

const createTransporte = async () => {
    const oauthClient = new Oauth2(
        process.env.G_CLIENT_ID,
        process.env.G_CLIENT_SECRET,
        'https://developers.google.com/oauthplayground'
    );
    oauthClient.setCredentials({ refresh_token: process.env.TOKEN_REFRESH });

    try {
        const accessToken = await oauthClient.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.G_USER,
                accessToken,
                clientId: process.env.G_CLIENT_ID,
                clientSecret: process.env.G_CLIENT_SECRET,
                refreshToken: process.env.TOKEN_REFRESH
            }
        })
        return transporter;

    } catch (error) {
        console.log(error);
    }
}

const sendEmail = async (options) => {
    try {
        const gmailTransporter = await createTransporte();
        gmailTransporter.use('compile', hbs({
            viewEngine: exphbs(),
            viewPath: 'src/views'
        }))
        const data = await gmailTransporter.sendMail(options);
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}

// const data = fs.readFileSync('../views/mail.handlebars', {encoding: 'utf8'})


module.exports = {
    sendEmail
}
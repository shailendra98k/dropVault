// Replace these values with your actual email configuration
const nodemailer = require('nodemailer');
require('dotenv').config();
const emailConfig = {
  host: 'smtp.zoho.in',
    port: 587,
    secure: false,
    auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_USER_PASSWORD
    }
};
const mailer = nodemailer.createTransport(emailConfig);
module.exports = mailer;
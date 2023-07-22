// Replace these values with your actual email configuration
const nodemailer = require('nodemailer');

const emailConfig = {
  host: 'smtp.zoho.in',
    port: 587,
    secure: false,
    auth: {
        user: 'shailendra.kumar@fakedropbox.fun',
        pass: 's3srz_nR'
    }
};
const mailer = nodemailer.createTransport(emailConfig);
module.exports = mailer;
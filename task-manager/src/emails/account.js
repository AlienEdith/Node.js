const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    const msg = {
        to: email,
        from: 'edith.w0807@gmail.com',
        subject: 'Welcome for Sign Up Task Manager',
        text: `${name}! Welcome to Yixing Wang's Task Manager`,
        html: `<strong>${name}! Welcome to Yixing Wang's Task Manager</strong>`,
      };
      
      sgMail.send(msg);
}

const sendCancelingEmail = (email, name) => {
    const msg = {
        to: email,
        from: 'edith.w0807@gmail.com',
        subject: 'Sad that you choose to leave Task Manager',
        text: `${name}! Please let me know why you leave Task Manager`,
        html: `<strong>${name}! Please let me know why you leave Task Manager</strong>`,
      };
      
      sgMail.send(msg);
}

module.exports = {
    sendWelcomeEmail,
    sendCancelingEmail
}
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    // 1)- Create a transporter for SMTP
    const transporter = nodemailer.createTransport({
        service : "gmail",
        secure: true, // upgrade later with STARTTLS
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // 2)- Define Email options : 

    const mailOpts = {
        from : "Prescripto <j3930271@gmail.com>",
        to : options.email,
        subject : options.subject,
        text: options.message
    }

    // 3)- Send the email : 

    await transporter.sendMail(mailOpts);
}

module.exports = sendEmail;
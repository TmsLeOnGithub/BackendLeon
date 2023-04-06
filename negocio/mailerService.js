
import nodemailer from 'nodemailer';

const enviarEmail = async (to, subject, html) => {
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "maribel41@ethereal.email" ,// generated ethereal user
            pass: "8c9ne73kqt44yg3HfQ", // generated ethereal password
        },
    });

    console.log(to);

    let info = await transporter.sendMail({
        from: '"maribel41@ethereal.email" <maribel41@ethereal.email>', // sender address
        to, // list of receivers
        subject, // Subject line
        html, // plain text body
    });


    console.log("Message sent: %s", info.messageId);

};

export const mailerService = { enviarEmail }
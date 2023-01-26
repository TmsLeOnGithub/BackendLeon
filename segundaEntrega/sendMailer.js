
//segunda entrega final
import { createTransport } from 'nodemailer'

//segunda entrega final nodemaider/////////

// const TEST_MAIL= 'christa14@ethereal.email';

const TEST_MAIL = 'florencio.moore73@ethereal.email';

const transporter = createTransport({ 
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: 'Kk54xFbHCcgCA8V8Du'
    }
});


export const sendMail = async(mail) => {      
      try {
        console.log('envio el email');
        const info = await transporter.sendMail (mail)
        console.log(info)
      } catch (error) {
        console.log(error)
      }
}


////////////////////// 
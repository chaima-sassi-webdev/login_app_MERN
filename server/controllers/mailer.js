import dotenv from "dotenv";
dotenv.config();

import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';




const transporter = nodemailer.createTransport({

    service:"gmail",

    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }

});
let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : "",
}
*/
export const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;
    // body of the email
    var email = {
        body : {
            name: username,
            intro : text || 'Welcome to Daily Tuition! We\'re very excited to have you on board.',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }

    var emailBody = MailGenerator.generate(email);

    let message = {
        from : process.env.EMAIL,
        to: userEmail,
        subject : subject || "Signup Successful",
        html : emailBody
    }

    // send mail
    transporter.sendMail(message)
    .then(() => {
        console.log("MAIL SENT SUCCESSFULLY");
        return res.status(200).send({ msg: "You should receive an email from us."});
    })
    .catch(error => {
        console.log("MAIL ERROR:", error);
        return res.status(500).send({ error });
    });
}
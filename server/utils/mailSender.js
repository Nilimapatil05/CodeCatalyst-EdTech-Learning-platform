
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.mailSender = async(email, subject, body)=>{
    
    try
    {
        let transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

    

    const mailOptions = {
        from: "TechGYAN || NSP",
        to: `${email}`,
        subject: `${subject}`,
        html:`${body}`
    }

    
    let info = await transport.sendMail(mailOptions);
    console.log("Mail response : ", info);
    return info;

    }catch(err)
    {
        console.log(err);
    }
}


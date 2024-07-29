const mongoose = require("mongoose");
const {mailSender} = require("../utils/mailSender");
const { emailVerificationTemplate } = require("../mail/templates/emailVerificationTemplate")

require("dotenv").config();

const OTPSchema = new mongoose.Schema({

    email :{
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 900, // seconds after 15min
    }
});

// pre middleware for OTP confirmation
//a function to send emails..
async function sendVerificationEmail(email, otp){

    try
    {
        const mailResponse = await mailSender(email, 
            "One-Time-Password(OTP) verification by TechGYAN", 
            emailVerificationTemplate(otp),
            // otp,
        );
        console.log("Email sent Sucessfully>>",mailResponse);

    }catch(err)
    {
        console.log("Errror occured while sending email ", err);
        throw err;
    }
}

// doc nahi aayga , abhi document to create he nahi hua hai
// next passes control to the next middleware in the chain



// document send hone se pehle ek mail bhejenge
//with this data like this.email,,, this.data
OTPSchema.pre("save", async function(next) {
    
    // user send otp controller me OPT.create k chlne se phle pre middleware chl jayega
    if(this.isNew) { 
        await sendVerificationEmail(this.email, this.otp); 
        // dont understand otp kaha se ayga

        //this.data this.otp current object ke data ko darshata haiiii
    }
    next();
})


const OTP = mongoose.model("OTP",OTPSchema);
module.exports = OTP;
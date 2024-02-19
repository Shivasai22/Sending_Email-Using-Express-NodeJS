const express = require( 'express');
const bodyParser =  require('body-parser');
const nodemailer =require( "nodemailer");
const dotnov =require('dotenv');// it helps us to manage environment variable(which bascially consistes of sensitive data)in a secure way.


const app = express();
const port =3000;

// middleware
app.use(bodyParser.json( )); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended:false}));
const route = express.Router();

// create resuable transporter object using the default SMTP transport
const transport=nodemailer.createTransport({
    port:465,
    host:"smtp.gmail.com",
    auth: {
        user:'UserEmail_ID@gmail.com', //  host email id
        pass:"APP Password" // it will ge generated on google Account security settings page
    },
    secure: true,
});

route.post('/expmail',(req,res)=>{
    const{to,subject,text}=req.body;
    const mailInfo={
        from : "UserEmail_ID@gmail.com",
        to:to,
        subject:subject,
        text:text,
        html:"<h1> Hello user we have been successfully able to send an email for the very FIRST time.</h1>"
    };
    transport.sendMail(mailInfo,function(err,info){
        if(err)
            return console.log(err);
        else 
            res.status(200).send({message:'Email sent',message_id:info.message});
    });
});

app.use('/api',route);
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});
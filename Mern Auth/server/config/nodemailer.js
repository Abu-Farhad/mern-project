import nodemailer from 'nodemailer'

const transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'abufarhadsardar91@gmail.com',
        pass:'inro qewz lddw prvj'
    },
    tls: {
    rejectUnauthorized: false // 🔑 allow self-signed certs
  }
})


export default transporter;

// const mailOptions={
//     from:process.env.SENDER_EMAIL,
//     to:"pelt-museum-panda@duck.com",
//     subject:'Test',
//     text:'This is a Test'
// }

// transporter.sendMail(mailOptions,(err,info)=>{
//     if(err) console.error(err);
//     else console.log('Email sent:',info.response)
// })
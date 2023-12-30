require('dotenv').config();
"use strict";
const nodemailer = require("nodemailer");
let sendSimpleEmail = async (dataSend) =>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_APP ,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });
      const info = await transporter.sendMail({
        from: '"Giang Nguyễn 👻" <giangquan27@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        text: "BookingCare", // plain text body
        html: 
          `<h3> Xin Chào ${dataSend.patientName}!</h3>
          <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare</p>
          <p>Thông tin đặt lịch khám bệnh: </p>
          <div><b>Thời gian: ${dataSend.time}</b></div>
          <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
          <p> Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link vào đường link bên dưới</p>
          <div>
          <a href=${dataSend.redirectLink} targer="_blank">Click here</a>
          </div>
          <div>Xin chân thành cảm ơn</div>
          `
        , // html body
      });
}
module.exports = {
    sendSimpleEmail:sendSimpleEmail
}
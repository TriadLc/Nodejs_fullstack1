require("dotenv").config();
const nodemailer = require("nodemailer");
//import nodemailer from "nodemailler";

let sendSimpleEmailService = async (dataSend) => {
  //Create reusable transporter object using the default SMTP transport

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, //true for 365, false for other ports
    auth: {
      user: process.env.EMAIL_APP, //generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // Generated ethereal password
    },
  });

  //Send mail with defined transport object
  let infor = await transporter.sendMail({
    from: `"Mr.Blue " <mrbluetester221@gmail.com>`, //send
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông báo đặt lịch khám bệnh", //Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";

  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
      <p>Bạn nhân dược email này vì đã đặt lịch khám bệnh online trên Clone-chanel</p>
      <p>Thông tin đặt lịch khám bệnh: </p>
      <div> 
          <h5>Bác sĩ: ${dataSend.doctorName}</h5></br>
          <h5>Thời gian: ${dataSend.time}</h5>
  
          <p>Nếu thông tin trên đúng sự thật, vui lòng chọn vào đường link bên dưới
          để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
      </div>
      <a href=${dataSend.redirectLink} targer="_blank">Click here</a>
      
      
      <div>Xin chân thành cảm ơn!</div>
    `;
  } else {
    result = `
    <h3>Dear ${dataSend.patientName}!</h3>
      <p>You received this email because you booked an online medical appointment </p>
      <p>Information to schedule an appointment: </p>
      <div> 
          <h5>Doctor: ${dataSend.doctorName}</h5></br>
          <h5>Time: ${dataSend.time}</h5>
  
          <p>If the above information is true. please click on the link below to .</p>
      </div>
      <a href=${dataSend.redirectLink} targer="_blank">Click here</a>
      
      
      <div>Sincerely thank!</div>
    `;
  }
  return result;
};
module.exports = {
  sendSimpleEmailService: sendSimpleEmailService,
  getBodyHTMLEmail: getBodyHTMLEmail,
};

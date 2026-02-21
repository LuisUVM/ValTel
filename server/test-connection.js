require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER, // Enviar a ti mismo
  subject: 'Prueba desde Node.js',
  text: 'Si recibes esto, todo funciona correctamente'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('❌ Error al enviar:', error);
  } else {
    console.log('✅ Correo enviado:', info.response);
  }
});
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'giridharan.7211@gmail.com',
    pass: 'jpjv qdkz gsdk epbi'
  }
});

export const mailOptions = {
  from: 'giridharan.7211@gmail.com',
  to: '',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

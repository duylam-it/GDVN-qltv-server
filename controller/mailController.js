import nodemailer from 'nodemailer';

let mailTransporter = new nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dl.night.2k@gmail.com',
    pass: 'hjgtzftsmfxxpgan'
  }
});

export default async function sendMail(email, subject, text) {
  const details = {
    from: 'QLTV <dl.night.2k@gmail.com>',
    to: email,
    subject: subject,
    text: text
  };
  try {
    return await mailTransporter.sendMail(details);
  } catch (error) {
    return error;
  }
}

import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import path from 'path';

// Load the JSON config
const smtpCfg = JSON.parse(readFileSync(
  (process.env.NODE_ENV === 'production') ?
    path.join(__dirname, 'config.json') :
    path.join(__dirname, '..', '..', '..', '..', '..', 'credentials', 'contact', 'config.json')
));

const transporter = nodemailer.createTransport(smtpCfg);

// transporter.verify((err, success) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   transporter.sendMail({
//     from: 'emm035@bucknell.edu',
//     to: 'ericmarshall715@gmail.com',
//     subject: 'Film Search Engine Feedback',
//     text: 'Hello World!'
//   }, (err, res) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(res);
//     }
//   });
// });

const sendMail = (sender, message) => {
  console.log(`Sending: ${message} for ${sender}`);
  return { success: false, status: 200 };
};

const sendMessage = (req, res) => {
  const sendRes = sendMail(req.body.email, req.body.msg);
  res.status(sendRes.status);
  res.send({ success: sendRes.success });
};

export {
  sendMessage
};

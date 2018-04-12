import nodemailer from 'nodemailer';
import moment from 'moment';
import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

// Get the current env
const env = process.env.NODE_ENV || 'development';

// Paths to follow for different envs
const productionCfgPath = path.join(__dirname, 'config.json');
const developmentCfgPath = path.join(__dirname, '..', '..', '..', '..', '..', 'configuration', 'contact', 'config.json');
const cfg = JSON.parse(readFileSync((env === 'production') ? productionCfgPath : developmentCfgPath));

// Nodemailer transporter - actually does the sending
const transporter = nodemailer.createTransport({
  host: 'email-smtp.us-east-1.amazonaws.com',
  port: 465,
  secure: true,
  auth: cfg.auth
});


/**
 * Verifies an email address
 * @param {string} address The email address to check
 * @returns {boolean} Whether or not the email address is valid
 */
const isValidEmailAddress = (address) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return address.match(emailRegex) !== null;
};


const sendMessage = ({ body: {email, msg} }, res) => {
  // Makes sure the email address is valid
  if (email === '' || isValidEmailAddress(email)) {
    // Build and send an email
    transporter.sendMail({
      to: _.join(cfg.recipients, ', '),
      replyTo: email,
      from: cfg.sender,
      sender: cfg.sender,
      subject: `${moment().format('M/D/YYYY h:mm a')} - Film Search Engine Feedback`,
      text: msg
    }, (err) => {
      // Handle return values
      if (err) {
        console.log(err.message);
        res.status(500);
        res.send({ success: false, message: err.message });
      } else {
        res.send({ success: true });
      }
    });
  } else {
    res.send({ success: false, message: 'Invalid email address' });
  }
};

export {
  sendMessage
};

import SES from 'aws-sdk/clients/ses';
import moment from 'moment';
import path from 'path';
import { readFileSync } from 'fs';

// Get the current env
const env = process.env.NODE_ENV || 'development';

// Paths to follow for different envs
const productionPath = path.join(__dirname, 'config.json');
const developmentPath = path.join(__dirname, '..', '..', '..', '..', '..', 'credentials', 'contact', 'config.json');

// Load the JSON config for the current env
const cfg = JSON.parse(readFileSync((env === 'production') ? productionPath : developmentPath))[env];

const ses = new SES();

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isValidEmailAddress = (address) => {
  return address.match(emailRegex) !== null;
};

const sendMessage = ({ body: {email, msg} }, res) => {
  if (isValidEmailAddress(email)) {
    ses.sendEmail({
      Destination: {
        ToAddresses: cfg.recipients
      },
      ReplyToAddresses: [
        email
      ],
      Message: {
        Text: {
          Charset: 'UTF-8',
          Data: msg
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `${moment().format('M/D/YYYY h:mm a')} - Film Search Engine Feedback`
        }
      },
      Source: cfg.sender
    }, (err) => {
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

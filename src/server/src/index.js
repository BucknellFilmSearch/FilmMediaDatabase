import path from 'path';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { search } from './api/search';
import { boundingBox } from './api/data/boundingBox';
import { getContext } from './api/context';
import { reportObject } from './api/data/reportObject';
import { sendMessage } from './api/contact';
import { classList } from './api/data/classList';

const port = 8080;

const app = express();

// Add body parser
app.use(bodyParser.json()); // Use a body parser for json requests
app.use(bodyParser.urlencoded({ extended: false })); // Use a body parser for url-encoded requests
app.use(morgan(':method :status :url - :response-time ms')); // Request logging

// Add static server capabilities
const staticDir = path.join(__dirname, 'static');
app.use('/', express.static(staticDir)); // Serve static files through the root path
app.use('/static', express.static(staticDir)); // Serve through the /static path as well

app.use('/feedback', express.static(path.join(staticDir, 'feedback.html'))); // TODO - Fix feedback page

// Add API routes
const apiRouter = express.Router();
apiRouter.get('/moviesearch/:text', search); // Default search endpoints
apiRouter.get('/boundingbox/:oclcId/:lineNumber', boundingBox); // Retrieve all bounding boxes for a given db line id
apiRouter.get('/moviesearch/context/:oclcId/:lineNumber', getContext); // Get the context view data for a given line
apiRouter.get('/classes', classList);
apiRouter.put('/boundingbox/report/:id', reportObject);
apiRouter.post('/contact', sendMessage);
app.use('/api', apiRouter); // Mount behind the /api sub-route

// Error handling (log it and return a 500 error)
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log(res);
  res.status(err.status || 500).send(err);
  next();
});

// Listen on port 8080
console.log(`Listening on port ${port}`);
app.listen(port);

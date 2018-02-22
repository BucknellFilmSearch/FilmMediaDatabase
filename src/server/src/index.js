import path from 'path';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { textSearch } from './api/search';
import { boundingBox } from './api/data/boundingBox';
import { getContext } from './api/context';
import { reportObject } from './api/data/reportObject';

const port = 8080;

const app = express();

// Add body parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser); // Use a body parser for url-encoded requests
app.use(morgan(':method :url :status :res[content-length] - :response-time ms')); // Request logging

// Add static server capabilities
const staticDir = path.join(__dirname, 'static');
app.use('/', express.static(staticDir)); // Serve static files through the root path
app.use('/static', express.static(staticDir)); // Serve through the /static path as well

app.use('/feedback', express.static(path.join(staticDir, 'feedback.html'))); // TODO - Fix feedback page

// Add API routes
const apiRouter = express.Router();
apiRouter.get('/moviesearch/:text', textSearch); // Default search endpoints
apiRouter.get('/boundingbox/:oclcId/:lineNumber', boundingBox); // Retrieve all bounding boxes for a given db line id
apiRouter.get('/moviesearch/context/:oclcId/:lineNumber', getContext); // Get the context view data for a given line
apiRouter.put('/reportobject/:id', reportObject);
app.use('/api', apiRouter); // Mount behind the /api sub-route

// Error handling (log it and return a 500 error)
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log(res);
  res.status(err.status || 500).send(err);
});

// Listen on port 8080
console.log(`Listening on port ${port}`);
app.listen(port);

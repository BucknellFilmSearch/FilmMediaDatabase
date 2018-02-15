import path from 'path';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { textSearch } from './endpoints/search';
import { boundingBox } from './endpoints/data/boundingBox';
import { getContext } from './endpoints/context';

const app = express();

// Add body parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Add static server capabilities
const staticDir = path.join(__dirname, '..', '..', 'static');
app.use('/', express.static(staticDir));
app.use('/static', express.static(staticDir));

app.use('/feedback', express.static(path.join(staticDir, 'feedback.html')));

// Add API routes
const apiRouter = express.Router();
apiRouter.get('/moviesearch/:text', textSearch);
apiRouter.get('/boundingbox/:dbLineId', boundingBox);
apiRouter.get('/moviesearch/context/:oclcId/:lineNumber', getContext);
app.use('/api', apiRouter);

// Handle Errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log(res);
  res.status(err.status || 500).send(err);
});

// Listen on port 8080
app.listen(8080);

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { textSearch } from './endpoints/search';

const app = express();

// Add body parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

// Add static server capabilities
const staticDir = path.join(__dirname, '..', '..', 'static');
app.use('/', express.static(staticDir));
app.use('/static', express.static(staticDir));

app.use('/feedback', express.static(path.join(staticDir, 'feedback.html')));

// Add search endpoint
app.get('/moviesearch/:text', textSearch);

// Handle Errors
app.use((err, req, res, next) => {
  console.error(err.message);
  console.log(res);
  res.status(err.status || 500).send(err);
});

// Listen on port 8080
app.listen(8080);

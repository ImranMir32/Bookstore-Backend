import express from 'express';
import bodyParser from 'body-parser';
import authorRoutes from './routes/authorRoutes';
import bookRoutes from './routes/bookRoutes';
import Config from './helpers/config';

const app = express();
const port = Config.getPort() || 3000;

app.use(bodyParser.json());

app.use('/api', authorRoutes);
app.use('/api', bookRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

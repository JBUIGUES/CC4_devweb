import express from 'express';
import bodyParser from 'body-parser';
import apiV1Router from './router/api-v1.mjs';
import apiV2Router from './router/api-v2.mjs';
import path from 'path';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api-v1', apiV1Router);
app.use('/api-v2', apiV2Router);

app.use(express.static(path.join(__dirname, 'static')));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

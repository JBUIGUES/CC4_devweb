const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const negotiateContent = require('express-negotiate-content');
app.use(negotiateContent());


const app = express();
const ejs = require('ejs');
const path = require('path');
app.use(bodyParser.json());
require('dotenv').config();
// Utilisez body-parser pour analyser les données du formulaire
app.use(bodyParser.urlencoded({ extended: false }));
// Base de données fictive pour stocker les liens
const linksDB = {};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Dossier contenant vos templates EJS

app.use(express.static(path.join(__dirname, 'public')));

// Route pour obtenir le nombre de liens créés
app.get('/', (req, res) => {
  const count = Object.keys(linksDB).length;
  res.json({ count });
});

app.post('/api-v2/', (req, res) => {
    const { url } = req.body;
    res.send('Lien créé avec succès !'); // Par exemple, renvoyer une réponse simple pour le moment
});


// Route pour créer un lien réduit à partir d'une URL longue
app.post('/', (req, res) => {
  const { longUrl } = req.body;
  if (!isValidURL(longUrl)) {
    return res.status(400).json({ error: 'URL invalide' });
  }
  const shortUrl = shortid.generate();
  linksDB[shortUrl] = { longUrl, createdAt: new Date(), visits: 0 };
  res.json({ shortUrl });
});

// Route pour obtenir l'état du lien
app.get('/status/:url', (req, res) => {
  const { url } = req.params;
  if (!linksDB[url]) {
    return res.status(404).json({ error: 'Lien introuvable' });
  }
  res.json(linksDB[url]);
});

// Route pour rediriger vers l'URL d'origine
app.get('/:url', (req, res) => {
  const { url } = req.params;
  if (!linksDB[url]) {
    return res.status(404).json({ error: 'Lien introuvable' });
  }
  linksDB[url].visits++;
  res.redirect(linksDB[url].longUrl);
});

// Fonction pour valider une URL
function isValidURL(str) {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // Protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // IPv4 Address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // Fragment locator
  return !!pattern.test(str);
}


const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Service de réduction d\'URL',
        version: '1.0.0',
        description: 'API pour raccourcir des URLs',
      },
    },
    // Fichiers contenant les routes à documenter
    apis: ['./routes/*.js'],
  };
  
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
  
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });
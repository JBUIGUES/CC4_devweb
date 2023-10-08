// api-v2.mjs

import express from 'express';
import { linksDB } from '../database/database.mjs';
const router = express.Router();

router.get('/', (req, res) => {
  const data = { numberOfLinks: Object.keys(linksDB).length };
  res.format({
    'application/json': () => {
      res.json(data);
    },
    'text/html': () => {
      // Renvoie la réponse HTML ici (par exemple, une page d'accueil)
      res.send('<html><body>Nombre de liens : ' + data.numberOfLinks + '</body></html>');
    },
    default: () => {
      res.status(406).send('Not Acceptable'); // En cas de format non pris en charge
    },
  });
});


export default router;

router.get('/create', (req, res) => {
    res.format({
      'application/json': () => {
        // Renvoie les informations JSON
        res.json({ message: 'Lien créé' });
      },
      'text/html': () => {
        // Rend le template EJS pour la page de création de lien
        res.render('create', { message: 'Lien créé' });
      },
      default: () => {
        res.status(406).send('Not Acceptable'); // En cas de format non pris en charge
      },
    });
  });
  
  
  module.exports = router;
  app.delete('/api-v2/:url', (req, res) => {
    const { url } = req.params;
    const apiKey = req.get('X-API-Key'); // Récupérez la clef d'API depuis l'en-tête X-API-Key
  
    // Vérifiez si le lien existe
    if (!linksDB[url]) {
      return res.status(404).json({ error: 'Lien introuvable' });
    }
  
    // Vérifiez si la clef d'API correspond au lien
    if (linksDB[url].secret !== apiKey) {
      return res.status(403).json({ error: 'Accès non autorisé' });
    }
  
    // Supprimez le lien de la base de données
    delete linksDB[url];
  
    res.status(200).json({ message: 'Lien raccourci supprimé avec succès' });
  });
  
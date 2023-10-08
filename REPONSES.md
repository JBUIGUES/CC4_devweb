1.
POST /api-v1/:
POST /api-v2/ : 
DELETE /api-v2/:url 

2.
http POST http://localhost:8080/api-v2/ Content-Type:application/json url="https://example.com"

3.

4.
Mode de Production :

Optimisation du Code, Désactivation des Outils de Débogage, Cache, Variables d'Environnement, Sécurité Renforcée, Stabilité

Mode de Développement :

Facilité de Développement, Rechargement Automatique, Niveau de Journalisation Élevé, Moins d'Optimisations, Variables d'Environnement de Développement, Sécurité Moins Stricte, Mises à Jour en Temps Réel

5.
dans package.json ;
"scripts": {
  "format": "prettier --write '**/*.mjs'"
}

puis npm run format

6.
const express = require('express');
const app = express();

// Désactiver l'en-tête X-Powered-By
app.disable('x-powered-by');

// ... autres configurations et routes de votre application ...

// Démarrer le serveur Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});


7.
// Middleware pour ajouter l'en-tête X-API-Version
const addApiVersionHeader = (req, res, next) => {
  const version = "votre_version";

  // Ajoutez l'en-tête X-API-Version à la réponse
  res.setHeader("X-API-Version", version);

  // Passez au middleware suivant
  next();
};

// Utilisez le middleware dans votre application
const express = require("express");
const app = express();

// Utilisez le middleware addApiVersionHeader pour toutes les routes de votre application
app.use(addApiVersionHeader);

// ... autres configurations et routes de votre application ...

// Démarrer le serveur Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});

8.
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');

const app = express();

// Spécifiez le chemin du fichier d'icône personnalisé
const faviconPath = path.join(__dirname, 'static', 'logo_univ_16.png');

// Utilisez le middleware serve-favicon pour servir l'icône personnalisée en réponse aux requêtes favicon.ico
app.use(favicon(faviconPath));

// ... autres configurations et routes de votre application ...

// Démarrer le serveur Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});

9.
https://github.com/mapbox/node-sqlite3

10.
1. Ouverture de la Connexion :
Au démarrage de l'application, Lors de l'initialisation de l'application, Avant l'exécution d'une requête

2. Fermeture de la Connexion :
À la fin de la requête, À la fin de l'application

11.
Express contrôle la mise en cache côté serveur en utilisant des en-têtes HTTP

12.
les deux instances de l'application s'exécutent indépendamment sur des ports différents et sont isolées les unes des autres. Pour partager des données ou des liens entre elles, il faut mettre en place des mécanismes de communication spécifiques pour permettre l'échange de données entre les instances.

13.
environ 296 heures

14.

15.

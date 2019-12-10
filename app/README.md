# Express Beers - Serveur back sur port 3000 avec Front intégré dans le dossier Public

Cette application utilise des Web Components (WC), formés avec la librairie LitElement (voir dossier "lit-element-beers").

Le point d'entrée de cette application est le fichier index.html dans le dossier Public, qui affiche le WC beer-main.

Ce beer-main utilise le router @granite-vaadin-router, qui affiche soit le WC beer-list, soit le WC beer-details.


## Démarrer le serveur

Ouvrir un terminal dans le dossier "express-beers/app" :

mongo

node index.js

Node démarre le fichier index.js et connecte le serveur à la base de données locale Mongo.

L'application tourne sur http://localhost:3000/app
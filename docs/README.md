# netflixSah
Netflix en R4A.10

J'ai appris du cours qu'une application web est utile lorsqu'on veut accéder à des données par le biais d'un navigateur et qu'une application mobile est développé spécifiquement pour un OS.

J'ai aussi appris qu'une application web est une application client-serveur où le client va faire une requête au serveur, puis le serveur va traiter la requête et utiliser la base de données pour recueillir des données et l'afficher au client.

J'ai déjà utilisé des outils comme Node.js et Express dans le cadre de la SAE de cette année, j'ai mis en place des routes avec des GET, POST. J'ai aussi fait un projet en PHP se nommant Lacosina.

Pour moi Netflix est une application web car le client va demander des requêtes comme cliquer sur une série, le serveur va alors regarder si la série existe bien dans la base de données et va répondre au client en le deplaçant sur l'interface de la série pour qu'il puisse choisir son épisode.

Les 3 différentes couches d'une application web appliqués à Netflix sont :
- Le front-end : où on va trouver l'interface utilisateur (l'affichage des séries, films, les pages de login, de création de compte, les boutons associés, le CSS).
- Le back-end : où on va gérer les fonctionnalités côté serveur (gérer les requêtes que le client effectue au niveau du front-end), gérer la logique métier (affichage des séries, films, gestion des boutons, etc...).
- La base de données : où on va stocker les données essentielles à l'application comme les identifiants de l'utilisateur, les séries, films, les paramètres, etc...

Que mettre sur la page d'accueil : 
- Dans le header : le logo Netflix avec juste à côté "Accueil", puis des liens de navigation pour passer entre les différentes pages (série, film, accueil, paramètres, compte) et un bouton rechercher
- Dans le body : les différentes séries de l'utilisateur (celles qu'il regarde en ce moment) 
- Dans le footer : les mentions légales 

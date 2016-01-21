# GHStats

Ce projet à été réalisé dans le cadre du cours TWEB donné à la HEIG-VD.

Auteur : Jan Purro

[Lien vers l'application déployée](https://test-tweb-jp.herokuapp.com/)

## Description de l'application

Le but de cette application est de fournir une interface simple permettant de fournir quelques informations sur les répértoires github d'un utilisatuer.

L'application offre une interface qui permet à l'utilisateur de rentrer un nom ou une partie d'un nom et de lancer une recherche. Les résultats de cette recherche sont présentés dans une liste qui affiche les avatars, pseudo, liens vers le repo github et score de chaque utilisateur retourné.

L'utilisateur peut sélectionner l'un des utilisateurs retourné pour afficher plus d'informations. Les informations disponibles sont :

* Les langages de programation utilisés dans les différents projet de l'utilisateur et leur répartition.

* La proportion de projets ayant des « issues ».

* La proportion de projets ayant des pages github.

* La proportion de projets ayant des wikis sur github.

Ces différents informations sont affichées sous formes de graphiques.

## Réalisation de l'application

### Technologies utilisées

* Utilisation de [Yeoman](http://yeoman.io/) pour générer le squelette de l'application.

* Utilisation de [Express.js](http://expressjs.com/) comme serveur web.

* Utilisation de [NPM](https://www.npmjs.com/) et [Bower](http://bower.io/) pour gérer les bibliothèques javascript.

* Utilisation de [Grunt](http://gruntjs.com/) pour automatiser le déployement de l'application lors des tests.

* Utilisation des bibliothèques [AngularJS](https://angularjs.org/), [angular-chart.js](https://github.com/jtblin/angular-chart.js) (portage de [Chart.js](http://www.chartjs.org/) pour AngularJS), pour gérer la page et afficher les graphiques affichant les données.

* Utilisation de [Jade](http://jade-lang.com/) pour l'écriture de la vue.

* Utilisation de [Bootstrap](https://getbootstrap.com/) comme thème.

* Utilisation de l'API REST de [Github](https://developer.github.com/v3/) pour récupérer les données affichées.

* Utilisation de [Heroku](https://www.heroku.com/) pour déployer l'application.

### Réalisation

Le développement s'est fait en plusieurs étapes :

* Génération d'un squellette d'application (express).

* Étude de l'API de github.

* Ajouts des bibliothèques javascript et de bootstrap au projet.

* Écriture de la vue. Tout tiens sur une seule page.

* Écriture du contrôlleur. 

* Déployement sur heroku. 

### API Github utilisée

Deux types d'appels différents sont réalisé dans l'application :

L'URL de base est : `https://api.github.com`

* **GET** `/search/users?q=<login>` : fait une recherche parmi les utilisateurs en se basant sur le *login* passé en paramètre. Dans ce cas la recherche s'effectue aussi bien au niveau du pseudonyme de l'utilisateur que des emails.
La méthode retourne une liste d'utilisateurs correspondant à la recherche avec une série d'informations, dont certaines sont affichées dans la liste de la vue.

* **GET** `/users/<login>/repos` : retroune la liste des dépôts de l'utilisateur passé en paramètre (*login*). Il s'agit d'un tableau de répértoires contenant de multiples informations concernant chaque répértoire. Une partie de ces informations sont utilisées pour dessiner les graphiques de l'application.

[Documentation de l'API](https://developer.github.com/v3/)

## Lancement de l'application

Pour lancer l'application en local il est nécessaire d'effectuer les manipulations suivantes.

* Commencer par cloner ce dépôt

* Ouvrir une console dans le dépôt cloné et exécuter la commande suivante : `npm install` (npm doit être installé sur le système).

* Toujours dans la même console, exécuter la commande suivante : `bower install` (bower doit être installé sur le système).

* Toujours dans la même console, exécuter la commande suivante : `grunt` (grunt doit être installé sur le système).

* L'application est maintenant disponible en local sur le port 3000. Il est possible d'y accéder à l'aide d'un navigateur : [http://localhost:3000/](http://localhost:3000/)

# Olympic Games

## Présentation

Cette application affiche les statistiques de participations aux Jeux Olympiques de différents pays.

On peut y retrouver le nombre de Jeux Olympiques concernés ainsi que le total de médailles obtenues par les pays,
Mais aussi des statistiques détaillées par pays avec :
- Le nombre d'athlètes.
- Les années de participation.
- Le nombre de médaille obtenues par année.

## Installation

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.

1) Cloner ce dépôt.
2) A la racine du projet exécutez la commande `npm install` pour installer les dépendances requises.
3) A la racine du projet exécutez la commande `ng serve` pour démarrer le projet.
4) Rendez-vous sur l'URL indiquée par la commande.

## Documentation

Le site dispose de 3 pages (`src/app/pages`) :
- `home` : Page d'accueil affichant l'ensemble des pays concernés et leur total de médailles.
- `country` : Page de détails d'un pays avec le nombre total d'athlètes et le nombre de médailles par années de participations.
- `not-found` : Page d'erreur affichée pour une page inexistante.

Les routes (URL) des pages sont définies dans `src/app/app-routing.module.ts`.

Un service `data` (`src/app/services`) permet de récupérer les données pour l'application.
Ainsi que les modèles de données associées dans `src/app/models`.

Les différents éléments composants des pages sont définis dans `src/app/components` :
- `header` : Titre de la page avec les encadrés bleu-vert.
- `medal-chart` : Camembert de la page d'accueil.
- `country-chart` : Graphique des participations d'un pays.
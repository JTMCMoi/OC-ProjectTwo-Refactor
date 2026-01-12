# Architecture observée

## Découpage du code

En dehors de l'`AppComponent` on retrouve un gros `component` par page.
Celui-ci contient l'intégralité du code de chaque page.

- Les `chart` :
    La construction d'un `chart` est systématiquement définie dans une méthode `buildChart`.
    Cela démontre qu'il s'agit d'une logique de code à part entière, qui sert à la génération d'un sous élément d'une page.
    Un chart devrait donc faire l'objet d'un `component` séparé.
- Récupération des données :
    Les données ne sont pas accessibles via un service, mais directement dans la page (c'est anti-pattern).
    Cela multiplie inutilement les appels HTTP (Un par page malgré une Single Page Application) et complexifie la gestion des erreurs.

## Duplication du code

- Les indications au dessus des `chart` :
    - Titre blanc sur fond bleu-vert.
    - Paire clé (grise) / valeur (noir) sur fond blanc encadré bleu-vert.
- Le lien de retour vers la page d'accueuil.

## Autres

- Absence de typage des données `any` lors de la récupération des données.
- Présences de `console.log` pour la gestion des erreurs.
- Abonnement à un observable longue durée `this.route.paramMap.subscribe()` sans désabonnement dans le `CountryComponent`.

# Proposition d'architecture

## Composants de page

Les `component` dit "de page" correspondent à la définition classique d'une page web.
Ce qui correspond aux `component` affichables via une route.

Ils seront stockés dans le dossier `src/app/pages`.

Les 3 pages restent :
- `CountryComponent`.
- `HomeComponent`.
- `NotFoundComponent`.

## Composants réutilisables

Les `component` dits "réutilisable" sont des composants `standalone` utilisés à l'intérieur des pages.
Ils ont pour but d'éviter de la répétition de code ou d'isoler une logique de code à part entière.

Bien que le lien de retour vers la page d'accueil soit présent sur plusieurs pages,
il ne concerne pas l'intégralité des pages (comme la page d'accueil elle-même par exemple).
De plus, un composant complet pour une unique balise de lien, même stylisée, serait une commplexification inutile.
C'est pourquoi il ne fera pas l'objet d'un `component`.

Ils seront stockés dans le dossier  `src/app/components`.

Ils seront au nombre de 3 :
- `CountryChartComponent` : Isole la logique de code du `chart` qui représente les médailles par participation d'un pays (page country).
- `MedalsChartComponent` : Isole la logique de code du `chart` qui représente le total des médailles par pays (page d'accueil).
- `HeaderComponent` : Entête pour les pages contenant un `chart`, reprends le titre ainsi que les encadrés clé/valeur.

## Données

Un `DataService` sera défini dans le dossier `src/app/services`.
Il utilisera le patron de conception (en: Design Pattern) `singleton`.
Il permettra via un unique appel HTTP de récupérer l'intégralité des données pour l'ensemble de l'application.

Le `DataService` retournera les données via des `interface` définies dans le dossier `src/app/models` :
- `Olympic` qui représentera un pays.
- `Participation` qui représentera une participation pour un pays.

## Architecture

- /src/app/components/
    - country-chart/
        - country-chart.component.html
        - country-chart.component.scss
        - country-chart.component.ts
    - header/
        - header.component.html
        - header.component.scss
        - header.component.ts
    - medals-chart/
        - medals-chart.component.html
        - medals-chart.component.scss
        - medals-chart.component.ts
- /src/app/models/
    - olympic.ts
    -participation.ts
- /src/app/pages/
    - country/
        - country.component.html
        - country.component.scss
        - country.component.ts
    - home/
        - home.component.html
        - home.component.scss
        - home.component.ts
    - not-found/
        - not-found.component.html
        - not-found.component.scss
        - not-found.component.ts

Note :
Les fichiers non pertinants au regard de la nouvelle architecture, comme les `*.spec.ts`,
sont ommis de la représentation car non pertinents pour l'exercice.

# CyberLab Academy V8

Plateforme pédagogique destinée à l'apprentissage des systèmes, des réseaux et de la cybersécurité défensive dans le cadre du BTS SIO SISR.

## Fonctionnalités

- Tableau de bord avec progression et XP
- Parcours de formation et leçons
- Missions pratiques avec checklist
- Quiz aléatoires et historique des résultats
- Calculateur IPv4 / CIDR
- Terminal réseau simulé
- Scénarios de cybersécurité défensive
- Supervision de serveurs fictifs
- Laboratoire Docker simulé
- Carnet de bord
- Thèmes sombre et clair
- Export et import de sauvegardes JSON
- Stockage local du navigateur
- Interface responsive

## Arborescence

```text
CyberLab-Academy-V8/
├── index.html
├── README.md
├── css/
│   └── style.css
└── js/
    ├── data.js
    ├── storage.js
    └── app.js
```

## Installation

1. Créer les fichiers et dossiers de l'arborescence.
2. Copier le contenu fourni dans chaque fichier.
3. Ouvrir `index.html` dans un navigateur pour un premier contrôle.
4. Publier le projet sur GitHub Pages.
5. Tester les différentes rubriques et sauvegarder les données.

## Publication GitHub Pages

1. Ouvrir le dépôt GitHub.
2. Aller dans Settings > Pages.
3. Sélectionner Deploy from a branch.
4. Choisir la branche `main` et le dossier `/ (root)`.
5. Enregistrer et attendre le déploiement.
6. Ouvrir l'URL GitHub Pages indiquée dans les paramètres.

## Stockage

Les données sont stockées dans le `localStorage` du navigateur.

Elles ne sont pas automatiquement synchronisées entre appareils ou navigateurs.
L'export JSON permet de créer une copie de la progression.

## Limites pédagogiques

- Les commandes réseau sont simulées.
- Les serveurs et métriques de supervision sont fictifs.
- Le laboratoire Docker ne démarre ni n'arrête de vrais conteneurs.
- Les scénarios de cybersécurité ne testent aucun système réel.
- Le calculateur IPv4 réalise des calculs locaux.

## Confidentialité

Cette version ne contient pas de service applicatif distant ni de base de données.
Ne stocker aucune donnée confidentielle dans le carnet de bord.

## Tests

Effectuer des vérifications manuelles après installation.
Ne pas considérer le projet comme testé automatiquement sans exécuter
des contrôles spécifiques.

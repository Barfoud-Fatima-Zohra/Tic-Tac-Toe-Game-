
# Tic-Tac-Toe avec l'Algorithme Minimax

## Description du Projet

Ce projet est un jeu de Tic-Tac-Toe développé en HTML, CSS et JavaScript, intégrant l'algorithme Minimax pour permettre à l'ordinateur de jouer de manière optimale. Le jeu est conçu pour permettre à un utilisateur humain de jouer contre un ordinateur (le "Robot").

## Fonctionnalités

- **Interface Utilisateur:** Une interface utilisateur simple et intuitive avec un plateau de jeu 3x3.
- **Tour par Tour:** Les joueurs alternent leurs tours, l'humain jouant avec "X" et l'ordinateur avec "O".
- **Algorithme Minimax:** Utilisé pour calculer le meilleur coup possible pour l'ordinateur afin de minimiser la chance de défaite et maximiser la chance de victoire.
- **Indication de Fin de Jeu:** Un message s'affiche à la fin de chaque partie pour indiquer si l'humain ou le robot a gagné, ou s'il y a égalité.
- **Réinitialisation du Jeu:** Un bouton "Reset" permet de réinitialiser le jeu à tout moment.

## Comment Jouer

1. Ouvrez le fichier `index.html` dans un navigateur web.
2. Cliquez sur une cellule vide pour jouer votre tour en tant que "X".
3. Attendez que l'ordinateur joue son tour en tant que "O".
4. Continuez à jouer jusqu'à ce qu'un joueur gagne ou qu'il y ait égalité.
5. Utilisez le bouton "Reset" pour recommencer une nouvelle partie.

## Explication de l'Algorithme Minimax

L'algorithme Minimax est une méthode récursive utilisée dans la théorie des jeux et l'intelligence artificielle pour déterminer le meilleur coup à jouer. Voici comment il fonctionne :

1. **Évaluation des Coups:** L'algorithme évalue tous les coups possibles disponibles sur le plateau.
2. **Maximisation et Minimisation:** 
   - Si c'est le tour de l'ordinateur (joueur maximisant), il choisit le coup qui maximise son score.
   - Si c'est le tour de l'humain (joueur minimisant), il choisit le coup qui minimise le score de l'ordinateur.
3. **Fonction de Score:** 
   - Si l'ordinateur gagne, le score est positif (ex. +10).
   - Si l'humain gagne, le score est négatif (ex. -10).
   - Si c'est une égalité, le score est neutre (0).
4. **Récursivité:** L'algorithme continue d'explorer les coups possibles de manière récursive jusqu'à atteindre une condition de fin de partie (victoire, défaite, égalité).

L'objectif de l'algorithme Minimax est de garantir que l'ordinateur joue de manière optimale, minimisant les pertes face à un adversaire parfait.

## Installation et Exécution

1. Clonez ce dépôt ou téléchargez les fichiers sources.
2. Ouvrez le fichier `index.html` dans votre navigateur préféré pour lancer le jeu.


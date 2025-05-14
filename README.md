# Jeu, Set et Famille – Jeu des 7 Familles en Ligne


**Par : Alexia Gastaud & Jade Bissessur**  
🔗 [Lien vers le dépôt GitHub](https://github.com/AlexiaGst/Jeu-Set-et-Famille)  
🔗 [Lien vers la vidéo de présentation](https://youtu.be/roGdibgyaZ4)

## À propos


**Jeu, Set et Famille** est une application web interactive multijoueur qui revisite le jeu des **7 familles** sur le thème du **sport**. Le nom du projet est un jeu de mots entre le tennis ("jeu, set et match") et le jeu des 7 familles.  
Chaque carte représente un sport ou un équipement sportif. Le site est conçu pour un large public : il suffit de connaître les règles du jeu pour commencer à jouer.




---


## Table des matières


- 🪧 [À propos](#à-propos)
- 📦 [Prérequis](#prérequis)
- 🚀 [Installation](#installation)
- 🛠️ [Utilisation](#utilisation)
- 🏗️ [Construit avec](#construit-avec)
- 📚 [Documentation](#documentation)
- 📝 [Sources](#sources)


---


## Prérequis


Voici les outils nécessaires pour exécuter correctement le projet :


- [Node.js](https://nodejs.org/) – Serveur pour la communication en temps réel entre les joueurs.
- [XAMPP](https://www.apachefriends.org/fr/index.html) – Serveur local Apache + MySQL pour l'exécution du backend PHP et la gestion de la base de données (ou un serveur en ligne).


---


##  Installation


1. **Cloner le dépôt GitHub** :


```bash
git clone https://github.com/AlexiaGst/Jeu-Set-et-Famille.git
cd Jeu-Set-et-Famille
```

2. **Lancer le serveur** :

```bash
node js/server.js
```

3. **Créer la base de donnée** :


Importer le fichier jeu-set-et-famille.sql dans votre gestionnaire de base de données (ex: phpMyAdmin).

## Utilisation

- Créer un compte utilisateur afin de jouer
- Se connecter 
- Lire les règles si vous ne connaissez pas le jeu
- Se familiariser avec les cartes et différentes familles du jeu
- Créer une partie ou rejoindre une partie 
- Jouer !

### Pages disponibles

- `index.php` → Accueil avec animation  
- `login.php` / `register.php` → Connexion / Inscription  
- `play_game.php` → Création ou recherche de partie  
- `create_game.php` → Création d’une partie  
- `ongoing_games.php` → Rejoindre une partie (privée ou publique) existante  
- `waiting_room.php` → Salle d’attente des joueurs  
- `partie.php` → Interface du jeu  
- `regles.php` → Règles du jeu  
- `famille.php` → Affichage des cartes par famille 

---

### Fonctionnalités

- Système d'authentification (connexion/inscription)  
- Gestion des parties multijoueurs  
- Distribution des cartes et affichage dynamique  
- Interactions entre joueurs (demande de cartes, pioche, tour par tour)

---

## Construit avec

### Langages & Frameworks

- HTML/CSS  
- JavaScript  
- PHP  
- WebSocket
- Requetes AJAX

---

## Sources

### Sources graphiques

- **Profils des joueurs** : Freepik – *Hand drawn people doing sports illustration set* by *pikisuperstar*  
- **Design des cartes** : Canva et Freepik  
- **Animation page d’accueil** : [CodePen – Animation Cards](https://codepen.io/waseem-polus/pen/NWLVzwb)
- **Animation page de chargement** : [Uiverse - Dot Animation](https://uiverse.io/Shoh2008/loud-warthog-69)

### Crédit modèle README

Modèle inspiré de ce [README](https://gist.github.com/marc-gavanier/8e2a2a14a888deb80978373e51682bfb)



# DOC Saison 7

## Import de la base de données

> Lors de la création d'un base de données, il faut penser à se créer un utilisateur

```sql 
CREATE USER 'todolist'@'localhost' IDENTIFIED BY PASSWORD '*224A615DCE809B047A2EB221CB5CBED1FFD71FD5';
```

On peut le faire avec adminer sinon : 
1. Se positionner sur la base de données
2. Aller sur "Privilèges"
3. Créer un utilisateur
   1. Préciser All privileges 

-> L'utilisateur a été créé.



---
# VSCODE

## Rechercher un raccourci 
CTRL + MAJ + p : affiche la liste de toutes les commandes possibles

## Rechercher un fichier
CTRL + p : puis taper un bout du nom pour filtrer

## Multi curseurs
CTRL + d : Ajout un curseur de sélection sur la prochaine occurrence du texte
CTRL + MAJ + l : Ajoute un curseur de sélection sur chaque occurrence texte
ALT + CLICK : Ajoute un curseur
CTRL + ALT + ⬇️ : Ajoute un curseur en bas (windows)
CTRL + MAJ + ⬇️ : Ajoute un curseur en bas (linux)
CTRL + ALT + ⬆️ : Ajoute un curseur en haut (windows)
CTRL + MAJ + ⬆️ : Ajoute un curseur en haut (linux)

## Dupliquer une ligne
CTRL + MAJ + ⬇️ : Vers le bas
CTRL + MAJ + ⬆️ : Vers le haut

## Plier le code
CRTL + k puis CTRL + & : Plier les parties avec l'identation de niveau 1
CRTL + k puis CTRL + é : Plier les parties avec l'identation de niveau 2
...
CRTL + k puis CTRL + j : Tout déplier
CRTL + k puis CTRL + à : Tout plier

## Commentaires
CTRL + MAJ + : : Ajoute un commentaire (linux)
CTRL + k puis CTRL + u : Enlève un commentaire (linux)
CTRL + : : Bascule un commentaire (windows)
CTRL + MAJ + A : Bascule un bloc de commentaire (linux)
ALT + MAJ + A : Bascule un bloc de commentaire (windows)

> Et bien d'autres à venir ^^
[![Dependency Status](https://david-dm.org/kbaptista/YSI-Dev.svg)](https://david-dm.org/kbaptista/YSI-Dev)

#YSI_Dev

API pour le cours CDP Master 2 informatique Bordeaux.

## Exécuter YSI localement
### Préalables

Avoir installé Node JS et MongoDB sur son poste de travail

### Installer les librairies Node
Lancer la commande suivante dans le répertoire YSI_Dev : 
```
npm install
```

### Installer les librairies Front-end
Lancer la commande suivante dans le répertoire YSI_Dev : 
```
bower install
```

### Lancer la base de donnée Mongo
Exécuter la commande suivante : 
* Windows:
```
C:\Program Files\MongoDB\bin\mongod.exe
```
* Mac:
```
mongod
```
* Ubuntu:
```
sudo service mongod start
```

### Vérifier que YSI_Dev est fonctionnel

Ouvrir son navigateur à `http://localhost:3000/login` et il devrait y avoir une interface de login. 
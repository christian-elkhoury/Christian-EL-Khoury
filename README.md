# CV — Christian EL KHOURY

Site web personnel responsive (desktop et mobile) généré à partir de mon CV
(fichier local `doc/cv-christian-el-khoury.md`, volontairement non versionné car il contient des coordonnées privées), déployé automatiquement sur GitHub Pages.

**Site en ligne :** https://christian-elkhoury.github.io/Christian-EL-Khoury/

## Lancer en local

Aucune installation nécessaire : ouvrez `index.html` dans un navigateur, ou lancez
un petit serveur local :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Déploiement

Chaque push sur la branche `main` déclenche le workflow
`.github/workflows/deploy.yml`, qui publie le site sur GitHub Pages.

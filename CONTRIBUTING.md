> 🚧 Page en construction

<h1 align="center">Contribuer à nosgestesclimat</h1>

<div align="center">

Bienvenue 👋 !

Ce dépôt contient le code source du site web Nos Gestes Climat.

Il importe directement le [modèle de calcul de l'app](https://github.com/incubateur-ademe/nosgestesclimat) publié sous forme de [paquet NPM](https://www.npmjs.com/package/@incubateur-ademe/nosgestesclimat).

Il est question ici uniquement de l'interface utilisateur, du style, des graphiques, du code JavaScript, etc. Pour contribuer au modèle de calcul, aux données sous-jacentes et aux textes du questionnaire (calculs, facteurs d'émission, infos, questions, réponses, suggestions de saisie), [suivez le guide de contribution dédié](https://github.com/incubateur-ademe/nosgestesclimat/blob/master/CONTRIBUTING.md).

Vous pouvez également visiter [notre wiki](https://accelerateur-transition-ecologique-ademe.notion.site/c57ea7dfc6214660a2d6a6a3addb88bd?v=d60b4b87e8ea4bee8e3c501bea75afc9) pour davantage de ressources.

</div>

---

## Lancer l'app en local

Pour lancer l'app en local, il suffit de cloner ce dépôt et de lancer dans son terminal :

```bash
yarn && yarn dev
```

Le site sera alors basé sur la dernière version publiée du modèle de calcul Nos Gestes Climat.

Pour faire tourner le site avec une version locale du modèle, vous devrez également cloner [le dépôt du modèle](https://github.com/incubateur-ademe/nosgestesclimat) et le lier au site via [`yarn link`](https://classic.yarnpkg.com/lang/en/docs/cli/link/) afin de voir les modifications du site mais aussi du modèle (questions, descriptions, calculs) en temps réel.

A utiliser, de cette manière, côté modèle :

```bash
yarn link
```

Puis, côté site :

```bash
yarn link @incubateur-ademe/nosgestesclimat
```

Pour finir, il faut lancer, côté modèle :

```bash
yarn compile
```

Puis, côté site :

```bash
yarn dev
```

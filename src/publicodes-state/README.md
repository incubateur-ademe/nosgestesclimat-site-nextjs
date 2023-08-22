# Publicodes State

Cette librairie met à disposition des hooks React permettant de gérer le state d'un utilisateur de Nos Gestes Climat et ses simulations associées.

Cette librairie souhaite permettre une façon simple et claire de modulariser le code de Nos Gestes Climat en permettant de séparer toute la logique utilisateur/formulaire/publicodes du reste du front-end. Cette séparation des préoccupations permet au front-end d'évoluer rapidement sans avoir à ce soucier des complexités du moteur publicodes.

Ce que cette librairie ne fait pas :

- Chargement des fichiers de règles Publicodes. Un fichier de règle doit être fourni déjà chargé au provider de la librairie
- Régionalisation et internationalisation. Le fichier de règle étant fourni par le front-end, la librairie n'a aucune idée de la langue de celui-ci.

## Utilisation

La librairie propose deux providers et leurs hooks associés : un pour la gestion d'un utilisateur et l'autre pour la gestion d'une simulation. Chacun peut être utilisé séparément.

---

### UserProvider

Hydrate l'application avec un objet utilisateur persisté. Permet d'utiliser le hook `useUser`.

#### Props

- `storageKey: string`
  - Définit la clé du localstorage ou seront sauvegardées les informations de l'utilisateur
  - **Facultatif**

---

### SimulationProvider

Hydrate l'application avec un moteur Publicodes, sa situation et les informations du formulaire associé. Permet d'utiliser les hooks `useForm` et `useRule`.
Il peut être utilisé à l'intérieur de `UserProvider` (celui ci pouvant fournir `situation` et `setSituation`) ou tout seul (dans ce cas la situation s'initialise à partir de `defaultSituation` et ne sera pas persistée).

#### Props

- `rules:  rules`
  - Objet de règles Publicodes
- `categoryOrder?:  string[]`
  - Array contenant la liste des catégories dans l'ordre dans lequel elles doivent s'afficher dans le formulaire
- `loader:  React.ReactNode`
  - Composant React à afficher le temps de l'initialisation du formulaire
- `defaultSituation?:  situation` (**Facultatif**)
  - La situation de départ du formulaire.
  - N'est pris en compte que si `situation` n'est pas renseigné.
- `situation?:  any` (**Facultatif**)
  - L'objet utilisé pour stocker la situation de la simulation à l'extérieur de celle-ci
  - Possibilité de passer la situation de la simulation en cours de l'utilisateur retournée via le hook `useUser` (`simulations[currentSimulation].situation`)
  - Si vide on utilisera un objet interne qui ne sera pas persisté
- `setSituation?:  Function` (**Facultatif**)
  - Une fonction permettant de mettre à jour la situation externe

---

### useUser

Retourne l'ensemble des informations utilisateur persistées et les setters permettant de les mettre à jour. Nécessite d'être à l'intérieur du provider `UserProvider`

#### Paramètres d'entrée

Ne prend pas de paramètre en entrée.

#### Valeurs de retour

- `user: {email: string, name: string}`
  - Un objet contenant les informations de l'utilisateur.
- `updateName: (name: string) => null`
  - Une fonction permettant de mettre à jour le nom de l'utilisateur
- `updateEmail: (email: string) => null`
  - Une fonction permettant de mettre à jour l'email de l'utilisateur
- `simulations: simulation[]`
  - Un array contenant les simulations de l'utilisateur
- `currentSimulation: string`
  - L'ID de la simulation en cours
- `setCurrentSimulation: (currentSimulation: string) => null`
  - Une fonction permettant de mettre à jour la simulation en cours
- `updateSituationOfCurrentSimulation: (situation: situation) => null`
  - Une fonction permettant de mettre à jour la situation de la simulation en cours.
- `initSimulation: (situation?: situation) => id:string`
  - Une fonction permettant de créer une nouvelle simulation
  - Possibilité de fournir une situation de base

---

### useForm

Retourne l'ensemble des informations sur la simulation en cours. Nécessite d'être à l'intérieur du provider `SimulationProvider`

#### Paramètres d'entrée

Ne prend pas de paramètre en entrée.

#### Valeurs de retour

- `categories:  string[]`
  - Un array contenant les noms des catégories de question.
- `relevantQuestions: string[]`
  - Un array contenant les noms de l'ensemble des questions qui relèvent de la simulation
  - Il contient l'ensemble des questions déjà répondus et celles restantes
  - Les questions sont classées dans l'ordre d'apparition dans le formulaire
- `remainingQuestions: string[]`
  - Un array contenant les noms de l'ensemble des questions restantes dans la simulation
- `currentQuestion: string`
  - Le nom de la question en cours
- `progression: number`
  - Le pourcentage de complétion de la simulation (de 0 à 1)
- `progressionByCategory: number`
  - Le pourcentage de complétion de la catégorie en cours
- `gotoNextQuestion: () => null`
  - Une fonction permettant de passer à la question suivante
  - Si aucune réponse n'a été apporté à la question en cours, la réponse par défaut sera utilisée
- `gotoPrevQuestion: () => null`
  - Une fonction permettant de passer à la question suivante
- `noPrevQuestion: boolean`
  - Renvoie `true` s'il n'y a pas de question précédente
- `noNextQuestion: boolean`
  - Renvoie `true` s'il n'y a pas de question suivante
- `noNextQuestionInCategory: boolean`
  - Renvoie `true` s'il n'y a pas de question suivante dans la catégorie en cours

---

### useRule

Retourne l'ensemble des informations d'une règle dans la simulation en cours Nécessite d'être à l'intérieur du provider `SimulationProvider`

#### Paramètres d'entrée

- `dottedName: string`
  - Le nom de la règle

#### Valeurs de retour

- `type:  'choices' | 'number' | 'mosaic' | 'notQuestion'`
  - Le type de la règle
- `category:  string`
  - Le nom de la catégorie de la règle
- `title: string`
  - Le titre de la règle
- `label: string | null`
  - Le label de la règle
- `description: string | null`
  - La description de la règle
- `unit: string | null`
  - L'unité de la règle
- `suggestions: suggestion[]``
  - Les suggestions de réponse de la règle
- `choices: choice[] | null`
  - Les options possible pour les questions de type `choices`
- `questionsOfMosaic: string[]`
  - Le nom des règles à afficher sur les questions de type `mosaic`
- `value: string | number | boolean | null`
  - La valeur de la règle
- `displayValue: string | number`
  - La valeur de la règle formatée pour affichage (exemple `true`=> `oui`)
- `isMissing: boolean`
  - Renvoie `true`si l'utilisateur n'a pas répondu à la question (et qu'elle est nécessaire pour compléter la simulation)
- `setValue: (value: string | number | boolean | null) => Promise({validValue: boolean, oldTotal: number, newTotal: number})`
  - Une fonction permettant de mettre à jour la valeur de la règle. Renvoie une promise avec un objet
    - `validValue` renvoie `false` si la valeur n'est pas applicable pour cette règle
    - `oldTotal` renvoie la valeur de `bilan` avant la mise à jour de la valeur
    - `newTotal` renvoie la valeur de `bilan` après la mise à jour de la valeur
- `setDefaultAsValue: (value: string | number | boolean | null) => Promise({validValue: boolean, oldTotal: number, newTotal: number})`
  - Une fonction permettant de mettre à jour la valeur de la règle avec la valeur par défaut. Renvoie une promise avec un objet
    - `validValue` renvoie `false` si la valeur n'est pas applicable pour cette règle
    - `oldTotal` renvoie la valeur de `bilan` avant la mise à jour de la valeur
    - `newTotal` renvoie la valeur de `bilan` après la mise à jour de la valeur

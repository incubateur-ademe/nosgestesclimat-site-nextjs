Publicodes State

Cette librairie met à disposition des hooks React permettant de gérer le state d'un utilisateur de Nos Gestes Climat et ses simulations associées.

Cette librairie souhaite permettre une façon simple et claire de modulariser le code de Nos Gestes Climat en permettant de séparer toute la logique utilisateur/formulaire/publicodes du reste du front-end. Cette séparation des préoccupations permet au front-end d'évoluer rapidement sans avoir à ce soucier des complexités du moteur Publicodes.

Ce que cette librairie ne fait pas :

- Chargement des fichiers de règles Publicodes. Un fichier de règle doit être fourni déjà chargé au provider de la librairie.
- Régionalisation et internationalisation. Le fichier de règle étant fourni par le front-end, la librairie n'a aucune idée de la langue de celui-ci.

## Utilisation

La librairie propose trois providers et leurs hooks associés : un pour la gestion d'un utilisateur, un pour initialiser l'engine et la simulation (basé sur les infos de user) et le dernier pour la gestion d'un formulaire (basé sur la simulation).

---

### UserProvider

Hydrate l'application avec les informations utilisateur persistées. Permet d'utiliser le hook `useUser`.

#### Props

- `initialRegion { code: string; name: string }`
  - La région de base de l'utilisateur
- `storageKey?: string`
  - Définit la clé du localStorage ou seront sauvegardées les informations de l'utilisateur

---

### SimulationProvider

Hydrate l'application avec un moteur Publicodes, sa situation, ses règles triées (questions, mosaics, etc.) et ses catégories et sous-catégories

#### Props

- `rules: Rules`
  - Objet de règles Publicodes
- `defaultSituation?: Situation`
  - La situation de départ de l'engine
- `situation: Situation`
  - La situation du user (qui sera mise à jour à chaque update)
- `updateSituation: (situation: Situation) => void`
  - La fonction permettant de mettre à jour la situation du user
- `foldedSteps: string[]`
  - La liste des questions répondues
- `addFoldedStep: (foldedStep: string) => void`
  - La fonction pour ajouter une question à la liste des questions répondues
- `categoryOrder: string[]`
  - Array contenant la liste des catégories dans l'ordre dans lequel elles doivent s'afficher dans le formulaire
- `root?: string`
  - La rule de base de la simulation (par défaut : "bilan")

---

### Hooks

- [useUser](./useUser/index.ts)

- [useForm](./useForm/index.ts)

- [useRule](./useRule/index.ts)
- [useActions](./useUser/index.ts)

- [useEngine](./useEngine/index.ts)
- [useDisposableEngine](./useDisposableEngine/index.ts)

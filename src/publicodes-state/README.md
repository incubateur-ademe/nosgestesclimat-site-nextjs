# Publicodes State

Cette librairie met à disposition des hooks React permettant de gérer le state d'un utilisateur de Nos Gestes Climat et ses simulations associées.

Cette librairie souhaite permettre une façon simple et claire de modulariser le code de Nos Gestes Climat en permettant de séparer toute la logique utilisateur/formulaire/publicodes du reste du front-end. Cette séparation des préoccupations permet au front-end d'évoluer rapidement sans avoir à se soucier des complexités du moteur Publicodes.

Ce que cette librairie ne fait pas :

- Chargement des fichiers de règles Publicodes. Un fichier de règle doit être fourni déjà chargé au provider de la librairie.
- Régionalisation et internationalisation. Le fichier de règle étant fourni par le front-end, la librairie n'a aucune idée de la langue de celui-ci.

La librairie propose trois providers et leurs hooks associés : un pour la gestion d'un utilisateur, un pour initialiser l'engine et la simulation (basé sur les infos de user) et le dernier pour la gestion d'un formulaire (basé sur la simulation).

## Providers

- [userProvider](./userProvider/index.ts)
- [simulationProvider](./simulationProvider/index.ts)
- [formProvider](./formProvider/index.ts)

## Hooks

- [useUser](./useUser/index.ts)

- [useForm](./useForm/index.ts)

- [useRule](./useRule/index.ts)
- [useActions](./useUser/index.ts)

- [useEngine](./useEngine/index.ts)
- [useDisposableEngine](./useDisposableEngine/index.ts)

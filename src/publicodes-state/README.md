# Publicodes State

This interval library contains context/providers and hooks to manage the publicodes user and form state for the Nos Gestes Climat webapp.

## Getting started

Requirements :
- The [UserProvider](./userProvider/provider.ts) should encapsulate at the higher level the app code. It allows to call the `useUser` hook inside its children. It contains all the logic relative to instantiating and updating the user state.

- The [EngineSetupProvider](./engineSetup/provider.ts) should be encapsulated inside the `UserProvider` (as it needs access to the simulations saved inside the user state, i.e.). It allows to call the `useEngine` hook inside its children. This provider: 
  - creates the Publicodes engine
  - extract the categories and subcategories from the rules
  - loads the situation in the engine
  - handles computing the computedResults, as a permanent background task

-

## Quelques exemples utiles :

### Providers

- [userProvider](./userProvider/index.ts)
- [simulationProvider](./simulationProvider/index.ts)
- [formProvider](./formProvider/index.ts)

### Hooks

- [useUser](./useUser/index.ts)

- [useForm](./useForm/index.ts)

- [useRule](./useRule/index.ts)
- [useActions](./useUser/index.ts)

- [useEngine](./useEngine/index.ts)
- [useDisposableEngine](./useDisposableEngine/index.ts)

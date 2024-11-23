# `@vue-use-x/common`
Provides general-purpose composables to simplify repetitive tasks during development, such as toggling loading states or using `provide`/`inject`, etc.

## Installation
```sh
npm i @vue-use-x/common
```

## Functionalities

### Context
- [`createContext`](./context/createContext): A utility to conveniently create a context for provide and inject values.
- [`ensureInjection`](./context/ensureInjection): Useful when the key that needs to be injected must be provided.

### Toggle
- [`withToggleRefAsync`](./toggle/withToggleRefAsync): Run an (async/sync) function while toggling a boolean ref object. It can be used in scenarios such as toggling a loading state.

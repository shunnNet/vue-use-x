# @vue-use-x/common
`Common` package of `vue-use-x`, see docs: https://vue-use-x.netlify.app/

Provides general-purpose composables to simplify repetitive tasks during development, such as toggling loading states or using `provide`/`inject`, etc.

## Installation
```sh
npm i @vue-use-x/common
```

## Functionalities

### Context
- [`createContext`](https://vue-use-x.netlify.app/common/context/createContext): A utility to conveniently create a context for provide and inject values.
- [`ensureInjection`](https://vue-use-x.netlify.app/common/context/ensureInjection): Useful when the key that needs to be injected must be provided.

### Toggle
- [`withToggleRefAsync`](https://vue-use-x.netlify.app/common/toggle/withToggleRefAsync): Run an (async/sync) function while toggling a boolean ref object. It can be used in scenarios such as toggling a loading state.


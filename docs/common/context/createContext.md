# `createContext`
`createContext` is a utility to conveniently create a context for `provide` and `inject` values.

## Why 
Typically, when creating a composable with provide and inject, you always need to perform the following actions:

```ts
// define context type
type TContext = { username: "my name" }
const obj: TCtx = { /*...*/ }

// create a key
const key: InjectionKey<TCtx> = Symbol()

// provide
provide(key, obj)

// inject
const ctx = inject(key, defaultValue)

// Maybe throw an Error if not provided
if (!ctx) {
  throw new Error("You should call `provide`")
}

// Maybe provide at app level
app.provide(key, context)
```

This can feel a bit fragmented and repetitive. The advantage of `createContext` is that it combines all these steps into one, so you don't have to repeat them.

## Usage
`createContext` automatically handles the key and some common operations internally, making the syntax more readable and concise.

```ts
// define context type
type TContext = { /*...*/ }
const obj: TCtx = { /*...*/ }

// Create context
const ctx = createContext<TContext>()

// `provide`. Just works like `provide(key, obj)`
ctx.provide(obj)

// Maybe provide at app level. Just works like `app.provide(key, obj)`
ctx.provideByApp(app, obj)

// inject. Just works like `inject(key, obj)`
ctx.inject(defaultValue)

// Throw an Error if not provided.
ctx.ensureInjection("You should call `provide`")
```

## Custom key
You can optionally pass a custom key to `createContext` if you need.

```ts{2}
const ctx = createContext<TContext>({ 
  key: Symbol("MyKey")
})
```


## Types
```ts
const createContext: <T = unknown>(options?: { key?: any }) => {
  provide: (ctx: T) => void
  provideByApp: (app: App, ctx: T) => void
  inject: (errMsg: string) => T
  readonly key: InjectionKey<T>
}
```

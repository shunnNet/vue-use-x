import { App, inject, InjectionKey, provide } from 'vue'

/**
 * Injects a value from the provided key, if it is not found, an error is thrown
 * @param injectKey - The key to inject
 * @param errorMsg - The error message to throw if the injection is not found
 * @returns
 */
export const ensureInjection = <T = unknown>(injectKey: string | InjectionKey<T>, errorMsg: string) => {
  const injection = inject(injectKey)

  if (!injection) {
    throw new Error(errorMsg)
  }

  return injection
}

/**
 * Creates a context for providing and injecting a value
 * @param options - The options for creating the context
 * @param options.key - The key to use for providing and injecting the value
 * @template T - The type of the value to provide and inject
 * @returns
 */
export const createContext = <T = unknown>(options: {
  key?: any
} = {}): (
  {
    provide: (ctx: T) => void
    provideByApp: (app: App, ctx: T) => void
    inject: (errMsg: string) => T
    get key(): InjectionKey<T>
  }
) => {
  const _opts = {
    ...options,
  }
  const _key: InjectionKey<T> = _opts.key ?? Symbol()
  return {
    /**
     * Provides the context value
     * @param ctx - The context value to provide
     * @returns void
     */
    provide: (ctx: T) => provide(_key, ctx),
    /**
     * Provides the context value using the app instance
     * @param app - The app instance to use for providing the context value
     * @param ctx - The context value to provide
     * @returns void
     */
    provideByApp: (app: App, ctx: T) => app.provide(_key, ctx),

    /**
     * Injects the context value
     * @param errMsg - The error message to throw if the injection is not found
     * @returns The injected context value
     */
    inject: (errMsg: string) => ensureInjection(_key, errMsg),

    /**
     * The key for providing and injecting the context value
     */
    get key() { return _key },
  }
}

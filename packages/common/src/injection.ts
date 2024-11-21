import { App, inject, InjectionKey, provide } from 'vue'

/**
 * Injects a value from the provided key, if it is not found, an error is thrown
 *
 * @param injectKey - The key to inject
 * @param errorMsg - The error message to throw if the injection is not found
 * @returns
 */
export const ensureInjection = <T = unknown>(injectKey: string | InjectionKey<T>, errorMsg: string) => {
  const _s = Symbol()
  const injection = inject(injectKey, _s as unknown as null)

  if (injection === _s) {
    throw new Error(errorMsg)
  }

  return injection as T
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
    inject: (defaults?: T) => T | undefined
    ensureInjection: (errMsg: string) => T
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
    ensureInjection: (errMsg: string) => ensureInjection(_key, errMsg),

    /**
     * Injects the context value, if it is not found, returns undefined the defaults (if provided)
     * @param defaults - The defaults value to return if the injection is not found
     * @returns The injected context value or the defaults
     */
    inject: (defaults?: T) => inject(_key, defaults),

    /**
     * The key for providing and injecting the context value
     */
    get key() { return _key },
  }
}

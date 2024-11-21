/**
 * A reactive object that represents a modal, with methods to open, close, patch and reset the data
 */
export type TModal<T extends TModalData = TModalData, R = any> = {
  /**
   * Is the modal visible
   */
  visible: boolean
  /**
   * The data of the modal, should be a plain object like `{}`
   */
  data: T
  /**
   * Close the modal with returnValue
   *
   * Returns an Object containing a `then` method which can be used to compose actions after `close()` is called. This may be useful when you want to simply close the modal and then do something else in template.
   */
  close: (returnValue?: R) => ({ then: (fn: ((returnValue?: R) => any)) => void })
  /**
   * Open the modal and optionally pass in data.
   *
   * The data should be a plain object like `{}`, and it will replace the current data.
   *
   * Returns a promise that resolves with the return value of the modal.
   */
  open: (data?: TModalDataExtend<T>) => Promise<R | undefined>
  /**
   * Patch the data of the modal.
   *
   * The data should be a plain object like `{}`, or a function which accepts the current data and returns a patch.
   *
   * The result will be merged with the current data.
   */
  patchData: (
    patch: Partial<TModalDataExtend<T>> | ((currentData: TModalDataExtend<T>) => Partial<TModalDataExtend<T>>)
  ) => void
  /**
   * Reset the data of the modal to the initial data
   */
  resetData: () => void
  /**
   * The return value of the modal
   *
   * Will always be set when the modal is closed.
   */
  returnValue: R | undefined
}

/**
 * The data of a modal
 */
export type TModalData = Record<string, any>

/**
 * The data of a modal
 */
type TModalDataExtend<T extends TModalData> = T

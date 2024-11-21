import { toValue, MaybeRefOrGetter } from 'vue'
import { TUseModalOptions, useModal } from './useModal'
import { TModalData } from './types'

type TCreateRefModalOptions<TModalOrModalRef, TOOption, TCOptions> = {
  open: (modal: TModalOrModalRef, data: TModalData, options: TOOption) => void
  close: (modal: TModalOrModalRef, returnValue: any, options: TCOptions) => void
}

/**
 * A function that can be used to create a `useModal` composable, corresponding to a modal that need to be opened using exposed methods.
 *
 * @example
 * import { createRefModal } from "@vue-use-x/modal"
 *
 * export const useRefModal = createRefModal<HTMLDialogElement | null>({
 *   open(modal) {
 *     modal?.showModal()
 *   },
 *   close(modal, returnValue) {
 *     modal?.close(returnValue)
 *   },
 * })
 *
 * // In the component
 * const modalRef = ref<HTMLDialogElement | null>(null)
 * const modal = useRefModal(modalRef, useModalOptions)
 * modal.open(data)
 *
 * @param {TCreateRefModalOptions<T>} createOptions - The options for creating the reference modal.
 * @param {MaybeRefOrGetter<T>} modalOrModalRef - A reference or getter for the modal.
 * @param {TUseModalOptions<TData, TReturnValue>} [options={}] - Additional options for using the modal.
 *
 * @returns {Function} A function that accepts modalRef and useModal options.
 *
 */
export const createRefModal = <T, O, C>(createOptions: TCreateRefModalOptions<T, O, C>) => {
  return <TData extends TModalData, TReturnValue>(
    modalOrModalRef: MaybeRefOrGetter<T>,
    options: TUseModalOptions<TData, TReturnValue> = {},
    openOptions: O,
    closeOptions: C,
  ) => useModal({
    ...options,
    onOpen(data) {
      createOptions.open(toValue(modalOrModalRef), data, openOptions)
      options.onOpen?.(data)
    },
    onClose(returnValue) {
      createOptions.close(toValue(modalOrModalRef), returnValue, closeOptions)
      options.onClose?.(returnValue)
    },
  })
}

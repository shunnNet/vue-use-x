import { computed, effectScope, reactive, ref, watch } from 'vue'
import { TModalData, TModal } from './types'
import { defer, TDefer } from '@vue-use-x/common'

export type TUseModalOptions<TData extends TModalData, TReturnValue> = {
/**
   * The initial data of the modal, should be a plain object like `{}`.
   *
   * @default {}
   */
  initData?: TData
  /**
 * Should the data be reset after the modal is closed
 *
 * @default false
 */
  resetDataAfterClose?: boolean
  /**
 * Callback when visible is set to true
 * @returns {void}
 */
  onOpen?: (data: TData) => void
  /**
 * Callback when visible is set to false
 * @returns {void}
 */
  onClose?: (returnValue: TReturnValue | undefined) => void
}
/**
 * A composable function to manage modal state in a Vue component.
 *
 * @template TData - The type of the modal data.
 * @template TReturnValue - The type of the return value when the modal is closed.
 *
 * @param {Object} options - Options for configuring the modal.
 * @param {TData} [options.initData] - The initial data of the modal. Defaults to an empty object.
 * @param {boolean} [options.resetDataAfterClose] - Should the data be reset after the modal is closed. Defaults to false.
 * @param {Function} [options.onOpen] - Callback when visible is set to true.
 * @param {Function} [options.onClose] - Callback when visible is set to false.
 *
 * @returns {TModal<TData, TReturnValue>} - A reactive object containing modal state and methods to control the modal.
 *
 * @example
 * const modal = useModal({
 *   initData: { name: 'John Doe' },
 *   resetDataAfterClose: true,
 * });
 *
 * modal.open();
 * modal.close();
 */
export const useModal = <
  TData extends TModalData = TModalData,
  TReturnValue = any,
>(options: TUseModalOptions<TData, TReturnValue> = {}): TModal<TData, TReturnValue> => {
  const _options = {
    initValue: {},
    resetDataAfterClose: false,
    ...options,
  }
  let _visible = false
  const visible = ref(false)
  const scoped = effectScope()
  scoped.run(() => {
    watch(visible, (newValue) => {
      if (!newValue) {
        close()
      }
      else {
        open()
      }
    })
  })
  const initData = _options.initData || ({} as TData)
  const _data = ref<TData>(initData)
  const data = computed(() => _data.value)

  const _returnValue = ref<TReturnValue>()
  const returnValue = computed(() => _returnValue.value)

  let _wait: TDefer<TReturnValue | undefined>
  const resetData = () => _data.value = initData

  const open = (data?: TData) => {
    if (_visible) {
      return _wait.promise
    }
    visible.value = _visible = true

    if (data) {
      _data.value = { ..._data.value, ...data }
    }
    _options.onOpen?.(_data.value)

    _wait = defer<TReturnValue | undefined>()
    return _wait.promise
  }

  const close = (returnValue?: TReturnValue) => {
    const r = {
      then: (fn: CallableFunction) => { fn(returnValue) },
    }
    if (!_visible) {
      return r
    }
    visible.value = _visible = false
    _options.onClose?.(returnValue)

    if (_options.resetDataAfterClose) {
      _data.value = initData
    }
    _returnValue.value = returnValue
    _wait._resolve(returnValue)

    return r
  }

  const patchData = (
    patch: Partial<TData> | ((currentData: TData) => Partial<TData>),
  ) => {
    _data.value = {
      ..._data.value,
      ...(typeof patch === 'function' ? patch(_data.value) : patch),
    }
  }

  return reactive({
    visible,
    data,
    open,
    close,
    patchData,
    resetData,
    returnValue,
  })
}

import { effectScope, onMounted, Ref, watch, WritableComputedRef } from 'vue'

type TOnOffActionMode = 'eager' | 'lazy' | 'onMounted'
type TOnOffActionOptions = {
  mode: TOnOffActionMode
}
type TOnOffActionRunContext = 'setup' | 'onMounted' | 'watch' | 'manual'

export function useOnOffAction(
  boolRef: Ref<boolean> | WritableComputedRef<boolean>,
  onAction?: (context: TOnOffActionRunContext) => any,
  offAction?: (context: TOnOffActionRunContext) => any,
  options: {
    mode?: TOnOffActionMode
  } = {},
) {
  const _opts: TOnOffActionOptions = {
    mode: 'lazy',
    ...options,
  }

  if (_opts.mode === 'eager') {
    run(boolRef.value, 'setup')
  }
  if (_opts.mode === 'onMounted') {
    onMounted(() => run(boolRef.value, 'onMounted'))
  }
  const scope = effectScope()
  scope.run(() => watch(boolRef, value => run(value, 'watch')))

  function run(value: boolean, context: TOnOffActionRunContext) {
    if (value) {
      onAction?.(context)
    }
    else {
      offAction?.(context)
    }
  }

  return {
    stop: () => scope.stop(),
    on: () => boolRef.value = true,
    off: () => boolRef.value = false,
    toggle: () => boolRef.value = !boolRef.value,
  }
}

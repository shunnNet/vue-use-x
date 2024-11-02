import { useModal } from '../src'
import { expect, test, vi } from 'vitest'
import { flushPromises } from '@vue/test-utils'

test('should open and close the modal', () => {
  const modal = useModal()
  expect(modal.visible).toBe(false)

  modal.open()
  expect(modal.visible).toBe(true)

  modal.close()
  expect(modal.visible).toBe(false)
})

test('should set and reset data', () => {
  const initData = { name: 'John Doe' }
  const modal = useModal({ initData, resetDataAfterClose: true })

  modal.open()
  expect(modal.data).toEqual(initData)

  modal.patchData({ name: 'Jane Doe' })
  expect(modal.data.name).toBe('Jane Doe')

  modal.close()
  expect(modal.data).toEqual(initData)
})

test('should call onOpen and onClose callbacks', () => {
  const onOpen = vi.fn()
  const onClose = vi.fn()
  const modal = useModal({ onOpen, onClose })

  modal.open()
  expect(onOpen).toHaveBeenCalled()

  modal.close()
  expect(onClose).toHaveBeenCalled()
})

test('should set return value on close', () => {
  const modal = useModal()

  modal.open()
  modal.close('returnValue')

  expect(modal.returnValue).toBe('returnValue')
})

test('should open modal with data', () => {
  const modal = useModal()
  const newData = { name: 'Jane Doe' }

  modal.open(newData)
  expect(modal.visible).toBe(true)
  expect(modal.data).toEqual(newData)
})

test('should patch data with object', () => {
  const initData = { name: 'John Doe', age: 30 }
  const modal = useModal({ initData })

  modal.open()
  modal.patchData({ age: 31 })
  expect(modal.data.age).toBe(31)
  expect(modal.data.name).toBe('John Doe')
})

test('should patch data with function', () => {
  const initData = { name: 'John Doe', age: 30 }
  const modal = useModal({ initData })

  modal.open()
  modal.patchData(data => ({ age: data.age + 1 }))
  expect(modal.data.age).toBe(31)
  expect(modal.data.name).toBe('John Doe')
})

test('should reset data after close', () => {
  const initData = { name: 'John Doe' }
  const modal = useModal({ initData, resetDataAfterClose: true })

  modal.open()
  modal.patchData({ name: 'Jane Doe' })
  expect(modal.data.name).toBe('Jane Doe')

  modal.close()
  expect(modal.data).toEqual(initData)
})

test('should not reset data after close when option set to false', () => {
  const initData = { name: 'John Doe' }
  const modal = useModal({ initData, resetDataAfterClose: false })

  modal.open()
  modal.patchData({ name: 'Jane Doe' })
  expect(modal.data.name).toBe('Jane Doe')

  modal.close()
  expect(modal.data.name).toBe('Jane Doe')
})

test('should trigger onOpen when visible is set to true', async () => {
  const onOpen = vi.fn()
  const modal = useModal({ onOpen })

  modal.visible = true
  await flushPromises()
  expect(onOpen).toHaveBeenCalled()
})

test('should trigger onClose when visible is set to false', async () => {
  const onClose = vi.fn()
  const modal = useModal({ onClose })

  modal.open()
  await flushPromises() // need flush or watcher won't trigger when `modal.visible = false`

  modal.visible = false
  await flushPromises()

  expect(onClose).toHaveBeenCalled()
})

test('should return promise when calling modal.open(), and the result is returnValue passed in close()', async () => {
  const modal = useModal()

  const promise = modal.open()
  modal.close('returnValue')

  const result = await promise
  expect(result).toBe('returnValue')
})

test('should call then method returned by modal.close()', () => {
  const modal = useModal()
  const thenCallback = vi.fn()

  modal.open()
  modal.close().then(thenCallback)

  expect(thenCallback).toHaveBeenCalled()
})

test('should reset data to initial state', () => {
  const initData = { name: 'John Doe' }
  const modal = useModal({ initData })

  modal.open()
  modal.patchData({ name: 'Jane Doe' })
  expect(modal.data.name).toBe('Jane Doe')

  modal.resetData()
  expect(modal.data).toEqual(initData)
})

test('should return same promise when open() is called second time after open()', () => {
  const modal = useModal()

  const firstPromise = modal.open()
  const secondPromise = modal.open()

  expect(firstPromise).toBe(secondPromise)
})

test('should return without calling onClose when close() is called second time after close()', () => {
  const onClose = vi.fn()
  const modal = useModal({ onClose })

  modal.open()
  modal.close()
  expect(onClose).toHaveBeenCalledTimes(1)

  modal.close()
  expect(onClose).toHaveBeenCalledTimes(1)
})

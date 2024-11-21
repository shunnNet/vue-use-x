
import { createRefModal }  from "@vue-use-x/modal"

export const useRefModal = createRefModal<HTMLDialogElement | null>({
  open(modal) {
    modal?.showModal()
  },
  close(modal, returnValue) {
    modal?.close(returnValue)
  },
})

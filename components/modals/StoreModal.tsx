import { FC } from 'react'

import { Modal } from '@/components/ui/modal'
import { useStoreModal } from '@/hooks/useStoreModal'

interface storeModalProps {}

const StoreModal: FC<storeModalProps> = ({}) => {
  const storeModal = useStoreModal()
  return (
    <Modal
      title='Create Store'
      description='Add a new store to manage products and categories'
      isOpen={storeModal.isOpen}
      onClose={() => storeModal.onClose}
    >
      Future Create Store Form
    </Modal>
  )
}

export default StoreModal

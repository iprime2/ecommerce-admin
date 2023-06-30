'use client'

import StoreModal from '@/components/modals/storeModal'
import { FC, useEffect, useState } from 'react'

interface modalProviderProps {}

const ModalProvider: FC<modalProviderProps> = ({}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <StoreModal />
    </>
  )
}

export default ModalProvider

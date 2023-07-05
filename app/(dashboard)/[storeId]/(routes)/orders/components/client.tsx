'use client'

import { FC } from 'react'

import Heading from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'
import { OrderColumn, columns } from './columns'
import { DataTable } from '@/components/ui/DataTable'

interface OrderClientProps {
  data: OrderColumn[]
}

const OrderClient: FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description='Manage order for your store'
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey='products' />
    </>
  )
}

export default OrderClient

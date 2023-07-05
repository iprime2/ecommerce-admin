import { FC } from 'react'
import { format } from 'date-fns'

import BillboardClient from './components/client'
import prismadb from '@/lib/prismadb'
import { OrderColumn } from './components/columns'
import { formatter } from '@/lib/utils'

interface OrdersPageProps {
  params: { storeId: string }
}

const OrdersPage: FC<OrdersPageProps> = async ({ params }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedOrder: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(', '),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price)
      }, 0)
    ),
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={formattedOrder} />
      </div>
    </div>
  )
}

export default OrdersPage

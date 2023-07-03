import { FC } from 'react'
import prismadb from '@/lib/prismadb'

interface DashboardPageProps {
  params: { storeId: string }
}

const DashboardPage: FC<DashboardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  })

  return (
    <>
      <div>Active Store: {store?.name}</div>
    </>
  )
}

export default DashboardPage

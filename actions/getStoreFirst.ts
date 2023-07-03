import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'

interface getStoreProps {
  storeId?: string
}
export default async function getStoreFirst(params: getStoreProps) {
  const { userId } = auth()
  const { storeId } = params || undefined

  try {
    let stores

    if (storeId) {
      stores = await prismadb.store.findFirst({
        where: {
          id: storeId,
        },
      })
    } else {
      stores = await prismadb.store.findFirst({
        where: {
          userId: userId as string,
        },
      })
    }

    if (!stores) {
      throw new Error('No store found')
    }
    console.log(stores)

    return stores
  } catch (error: any) {
    throw new Error(error)
  }
}

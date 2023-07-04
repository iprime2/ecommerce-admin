import { Billboard } from '@prisma/client'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import prismadb from '@/lib/prismadb'

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = auth()

    const { categoryId } = params

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 400 })
    }

    if (!categoryId) {
      return new NextResponse('Category Id is required', { status: 400 })
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORIES_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth()
    const { storeId, categoryId } = params
    const body = await req.json()

    const { name, billboardId } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!name) {
      return new NextResponse('label is required', { status: 400 })
    }

    if (!billboardId) {
      return new NextResponse('Image Url is required', { status: 400 })
    }

    if (!storeId) {
      return new NextResponse('Store Id is required', { status: 400 })
    }

    if (!categoryId) {
      return new NextResponse('category Id is required', { status: 400 })
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const category = await prismadb.category.updateMany({
      where: {
        id: categoryId,
      },
      data: {
        name,
        billboardId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORIES_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth()

    const { storeId, categoryId } = params

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 400 })
    }

    if (!categoryId) {
      return new NextResponse('category Id is required', {
        status: 400,
      })
    }

    if (!storeId) {
      return new NextResponse('Store Id is required', { status: 400 })
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    })

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    const category = await prismadb.category.deleteMany({
      where: {
        id: categoryId,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORIES_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

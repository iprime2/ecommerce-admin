import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import prismadb from '@/lib/prismadb'

export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    const { userId } = auth()

    const { colorId } = params

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 400 })
    }

    if (!colorId) {
      return new NextResponse('Billboard Id is required', { status: 400 })
    }

    const color = await prismadb.color.findUnique({
      where: {
        id: colorId,
      },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log('[SIZES_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth()
    const { storeId, colorId } = params
    const body = await req.json()

    const { name, value } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!name) {
      return new NextResponse('name is required', { status: 400 })
    }

    if (!value) {
      return new NextResponse('value Url is required', { status: 400 })
    }

    if (!storeId) {
      return new NextResponse('Store Id is required', { status: 400 })
    }

    if (!colorId) {
      return new NextResponse('billboard Id is required', { status: 400 })
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

    const color = await prismadb.color.updateMany({
      where: {
        id: colorId,
      },
      data: {
        name,
        value,
      },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log('[COLORS_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth()

    const { storeId, colorId } = params

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 400 })
    }

    if (!colorId) {
      return new NextResponse('Size Id is required', { status: 400 })
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

    const color = await prismadb.color.deleteMany({
      where: {
        id: colorId,
      },
    })

    return NextResponse.json(color)
  } catch (error) {
    console.log('[COLORS_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

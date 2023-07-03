import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import prismadb from '@/lib/prismadb'

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    const { userId } = auth()

    const { billboardId } = params

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 400 })
    }

    if (!billboardId) {
      return new NextResponse('Billboard Id is required', { status: 400 })
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: billboardId,
      },
    })

    return NextResponse.json(billboard)
  } catch (error) {
    console.log('[BILLBOARD_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth()
    const { storeId, billboardId } = params
    const body = await req.json()

    const { label, imageUrl } = body

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    if (!label) {
      return new NextResponse('label is required', { status: 400 })
    }

    if (!imageUrl) {
      return new NextResponse('Image Url is required', { status: 400 })
    }

    if (!storeId) {
      return new NextResponse('Store Id is required', { status: 400 })
    }

    if (!billboardId) {
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

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    })

    return NextResponse.json(billboard)
  } catch (error) {
    console.log('[BILLBOARDS_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth()

    const { storeId, billboardId } = params

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 400 })
    }

    if (!billboardId) {
      return new NextResponse('Billboard Id is required', { status: 400 })
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

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: billboardId,
      },
    })

    return NextResponse.json(billboard)
  } catch (error) {
    console.log('[BILLBOARD_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

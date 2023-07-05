'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { FC } from 'react'

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname()
  const params = useParams()

  const routes = [
    {
      key: 'Overview',
      href: `/${params.storeId}`,
      label: 'Overview',
      active: pathname === `/${params.storeId}`,
    },
    {
      key: 'Billboards',
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      active:
        pathname === `/${params.storeId}/billboards` ||
        pathname === `/${params.storeId}/billboards/${params.billboardId}` ||
        pathname === `/${params.storeId}/billboards/new`,
    },
    {
      key: 'Categories',
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      active:
        pathname === `/${params.storeId}/categories` ||
        pathname === `/${params.storeId}/categories/${params.categoryId}` ||
        pathname === `/${params.storeId}/categories/new`,
    },
    {
      key: 'Sizes',
      href: `/${params.storeId}/sizes`,
      label: 'Size',
      active:
        pathname === `/${params.storeId}/sizes` ||
        pathname === `/${params.storeId}/sizes/${params.sizeId}` ||
        pathname === `/${params.storeId}/sizes/new`,
    },
    {
      key: 'Colors',
      href: `/${params.storeId}/colors`,
      label: 'Color',
      active:
        pathname === `/${params.storeId}/color/${params.colorId}` ||
        pathname === `/${params.storeId}/colors` ||
        pathname === `/${params.storeId}/colors/new`,
    },
    {
      key: 'products',
      href: `/${params.storeId}/products`,
      label: 'Product',
      active:
        pathname === `/${params.storeId}/products/${params.productId}` ||
        pathname === `/${params.storeId}/products` ||
        pathname === `/${params.storeId}/products/new`,
    },
    {
      key: 'orders',
      href: `/${params.storeId}/orders`,
      label: 'Order',
      active:
        pathname === `/${params.storeId}/orders/${params.orderId}` ||
        pathname === `/${params.storeId}/orders` ||
        pathname === `/${params.storeId}/orders/new`,
    },
    {
      key: 'Settings',
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`,
    },
  ]

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((route) => (
        <Link
          key='route.href'
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

export default MainNav

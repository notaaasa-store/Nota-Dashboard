'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/products', label: 'Products' },
    { href: '/inventory', label: 'Inventory' },
    { href: '/orders', label: 'Orders' },
    { href: '/packaging', label: 'Packaging' },
    { href: '/printing', label: 'Printing' },
    { href: '/expenses', label: 'Expenses' },
    { href: '/partners', label: 'Partners' },
  ]

  return (
    <nav className="bg-white border-b border-[#F0D0D8] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-1 overflow-x-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-[#D8A0B0] text-white'
                      : 'text-[#7A7173] hover:bg-[#F0D0D8] hover:text-[#2D292A]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

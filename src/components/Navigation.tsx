'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

export default function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()

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

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <nav className="bg-white border-b border-[#F8DDE3] sticky top-0 z-50">
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
                      ? 'bg-[#E9AAB8] text-white'
                      : 'text-[#7A7173] hover:bg-[#F8DDE3] hover:text-[#2D292A]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
          {session && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#7A7173]">
                {session.user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-[#F5A3A3] hover:bg-[#E09090] text-white rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

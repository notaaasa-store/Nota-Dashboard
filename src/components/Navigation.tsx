'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

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
    window.location.href = '/login'
  }

  return (
    <nav className="bg-white border-b border-[#FFE5F0] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-1 overflow-x-auto hidden sm:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-[#F951AC] text-white'
                      : 'text-[#B7ADA3] hover:bg-[#FFE5F0] hover:text-[#332B30]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            {session && (
              <span className="hidden sm:block text-sm text-[#B7ADA3]">
                {session.user?.name}
              </span>
            )}
            {session && (
              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-[#F951AC] hover:bg-[#E0489E] text-white rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="sm:hidden p-2 rounded-lg text-[#B7ADA3] hover:bg-[#FFE5F0]"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="sm:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#F951AC] text-white'
                        : 'text-[#B7ADA3] hover:bg-[#FFE5F0] hover:text-[#332B30]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
              {session && (
                <button
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className="px-3 py-2 bg-[#F951AC] hover:bg-[#E0489E] text-white rounded-lg text-sm font-medium transition-colors text-left"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

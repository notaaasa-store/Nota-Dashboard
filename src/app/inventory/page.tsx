import { prisma } from '@/lib/prisma'
import Navigation from '@/components/Navigation'

export const dynamic = 'force-dynamic'

export default async function InventoryPage() {
  const inventory = await prisma.inventory.findMany({
    include: {
      product: true,
    },
    orderBy: { stockStatus: 'asc' },
  })

  return (
    <div className="min-h-screen bg-[#FFFCFD]">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#332B30]">Inventory</h1>
          <p className="text-[#B7ADA3] mt-1">Track stock levels and inventory value</p>
        </div>
        {inventory.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#FFE5F0] p-12 text-center shadow-sm">
            <p className="text-[#B7ADA3] text-lg mb-4">No inventory yet</p>
            <p className="text-[#B7ADA3] text-sm">
              Inventory will be automatically managed when you add products and orders.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-[#FFE5F0] shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-[#FFE5F0]">
              <thead className="bg-[#FFFCFD]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#B7ADA3] uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#B7ADA3] uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#B7ADA3] uppercase tracking-wider">
                    Current Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#B7ADA3] uppercase tracking-wider">
                    Unit Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#B7ADA3] uppercase tracking-wider">
                    Total Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#B7ADA3] uppercase tracking-wider">
                    Reorder Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#B7ADA3] uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#FFE5F0]">
                {inventory.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#332B30] font-medium">
                      {item.product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#B7ADA3]">
                      {item.product.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#332B30]">
                      {item.currentQuantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#332B30]">
                      EGP {item.unitCost.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#332B30] font-medium">
                      EGP {item.totalInventoryValue.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#B7ADA3]">
                      {item.reorderLevel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.stockStatus === 'In Stock'
                            ? 'bg-[#A7D7C5] text-white'
                            : item.stockStatus === 'Low Stock'
                            ? 'bg-[#F5E6A3] text-[#332B30]'
                            : 'bg-[#F5A3A3] text-white'
                        }`}
                      >
                        {item.stockStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}

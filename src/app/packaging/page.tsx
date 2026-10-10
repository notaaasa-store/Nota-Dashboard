import { prisma } from '@/lib/prisma'
import Navigation from '@/components/Navigation'
import { deletePackaging } from '@/app/actions'

export const dynamic = 'force-dynamic'

export default async function PackagingPage() {
  const packaging = await prisma.packaging.findMany({
    orderBy: { purchaseDate: 'desc' },
  })

  return (
    <div className="min-h-screen bg-[#FFF9FA]">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#2D292A]">Packaging</h1>
            <p className="text-[#7A7173] mt-1">Track packaging materials and costs</p>
          </div>
          <button className="px-4 py-2 bg-[#E9AAB8] hover:bg-[#D99A8A] text-white rounded-lg transition-colors font-medium">
            Add Packaging
          </button>
        </div>
        {packaging.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#F8DDE3] p-12 text-center shadow-sm">
            <p className="text-[#7A7173] text-lg mb-4">No packaging items yet</p>
            <p className="text-[#7A7173] text-sm">
              Add your first packaging item to start tracking material costs.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-[#F8DDE3] shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-[#F8DDE3]">
              <thead className="bg-[#FFF9FA]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7173] uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7173] uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7173] uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7173] uppercase tracking-wider">
                    Total Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7173] uppercase tracking-wider">
                    Cost Per Unit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7173] uppercase tracking-wider">
                    Remaining
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7173] uppercase tracking-wider">
                    Supplier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7173] uppercase tracking-wider">
                    Purchase Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-[#7A7173] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#F8DDE3]">
                {packaging.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2D292A] font-medium">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#7A7173]">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2D292A]">
                      {item.quantityPurchased}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2D292A]">
                      EGP {item.totalPurchaseCost.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#E9AAB8] font-medium">
                      EGP {item.costPerUnit.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2D292A]">
                      {item.remainingQuantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#7A7173]">
                      {item.supplier || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#7A7173]">
                      {new Date(item.purchaseDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-[#E9AAB8] hover:text-[#D99A8A] font-medium mr-3">
                        Edit
                      </button>
                      <DeleteButton packagingId={item.id} />
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

async function DeleteButton({ packagingId }: { packagingId: string }) {
  return (
    <form action={async () => {
      'use server'
      await deletePackaging(packagingId)
    }}>
      <button
        type="submit"
        className="text-[#F5A3A3] hover:text-[#E09090] font-medium"
      >
        Delete
      </button>
    </form>
  )
}

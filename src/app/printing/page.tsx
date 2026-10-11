import { prisma } from '@/lib/prisma'
import Navigation from '@/components/Navigation'
import { deletePrinting } from '@/app/actions'

export const dynamic = 'force-dynamic'

export default async function PrintingPage() {
  const printing = await prisma.printing.findMany({
    orderBy: { date: 'desc' },
    include: {
      product: true,
    },
  })

  return (
    <div className="min-h-screen bg-[#FFF9FA]">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#2D292A]">Printing / Production</h1>
            <p className="text-[#7A7173] mt-1">Track printing and production costs</p>
          </div>
          <button className="px-4 py-2 bg-[#D8A0B0] hover:bg-[#D99A8A] text-white rounded-lg transition-colors font-medium">
            Add Printing Record
          </button>
        </div>
        {printing.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#F0D0D8] p-12 text-center shadow-sm">
            <p className="text-[#7A7173] text-lg mb-4">No printing records yet</p>
            <p className="text-[#7A7173] text-sm">
              Add your first printing record to start tracking production costs.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-[#F0D0D8] shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-[#F0D0D8]">
              <thead className="bg-[#FFF9FA]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7173] uppercase tracking-wider">
                    Item Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7173] uppercase tracking-wider">
                    Product
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
                    Supplier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7173] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-[#7A7173] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#F0D0D8]">
                {printing.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2D292A] font-medium">
                      {record.itemName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#7A7173]">
                      {record.product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2D292A]">
                      {record.quantityProduced}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2D292A]">
                      EGP {record.totalPrintingCost.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#D8A0B0] font-medium">
                      EGP {record.costPerUnit.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#7A7173]">
                      {record.supplier || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#7A7173]">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-[#D8A0B0] hover:text-[#D99A8A] font-medium mr-3">
                        Edit
                      </button>
                      <DeleteButton printingId={record.id} />
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

async function DeleteButton({ printingId }: { printingId: string }) {
  return (
    <form action={async () => {
      'use server'
      await deletePrinting(printingId)
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

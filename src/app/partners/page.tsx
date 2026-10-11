import { prisma } from '@/lib/prisma'
import Navigation from '@/components/Navigation'
import { deleteContribution } from '@/app/actions'

export const dynamic = 'force-dynamic'

export default async function PartnersPage() {
  const contributions = await prisma.partnerContribution.findMany({
    orderBy: { date: 'desc' },
  })

  const partner1Total = await prisma.partnerContribution.aggregate({
    where: { partner: 'ALI' },
    _sum: { amount: true },
  })

  const partner2Total = await prisma.partnerContribution.aggregate({
    where: { partner: 'Salma' },
    _sum: { amount: true },
  })

  const totalContributions = (partner1Total._sum.amount || 0) + (partner2Total._sum.amount || 0)
  const partnerDifference = Math.abs((partner1Total._sum.amount || 0) - (partner2Total._sum.amount || 0))

  return (
    <div className="min-h-screen bg-[#FFF9FA]">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#332B30]">Partner Contributions</h1>
            <p className="text-[#B7ADA3] mt-1">Track payments made by each business partner</p>
          </div>
          <button className="px-4 py-2 bg-[#F951AC] hover:bg-[#D99A8A] text-white rounded-lg transition-colors font-medium">
            Add Contribution
          </button>
        </div>
        {/* Partner Summary */}
        <div className="bg-white rounded-lg border border-[#FFE5F0] p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-[#332B30] mb-4">Contribution Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-[#B7ADA3]">ALI Total</p>
              <p className="text-xl font-semibold text-[#332B30] mt-1">
                EGP {(partner1Total._sum.amount || 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#B7ADA3]">Salma Total</p>
              <p className="text-xl font-semibold text-[#332B30] mt-1">
                EGP {(partner2Total._sum.amount || 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#B7ADA3]">Total Contributions</p>
              <p className="text-xl font-semibold text-[#332B30] mt-1">EGP {totalContributions.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-[#B7ADA3]">Difference</p>
              <p className="text-xl font-semibold text-[#332B30] mt-1">EGP {partnerDifference.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {contributions.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#FFE5F0] p-12 text-center shadow-sm">
            <p className="text-[#B7ADA3] text-lg mb-4">No contributions yet</p>
            <p className="text-[#B7ADA3] text-sm">
              Add your first partner contribution to start tracking who paid for what.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-[#FFE5F0] shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-[#FFE5F0]">
              <thead className="bg-[#FFF9FA]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#B7ADA3] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#B7ADA3] uppercase tracking-wider">
                    Partner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#B7ADA3] uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#B7ADA3] uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#B7ADA3] uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-[#B7ADA3] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#FFE5F0]">
                {contributions.map((contribution) => (
                  <tr key={contribution.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#B7ADA3]">
                      {new Date(contribution.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#332B30] font-medium">
                      {contribution.partner}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#332B30]">{contribution.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#332B30]">
                      EGP {contribution.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#B7ADA3]">
                      {contribution.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-[#F951AC] hover:text-[#D99A8A] font-medium mr-3">
                        Edit
                      </button>
                      <DeleteButton contributionId={contribution.id} />
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

async function DeleteButton({ contributionId }: { contributionId: string }) {
  return (
    <form action={async () => {
      'use server'
      await deleteContribution(contributionId)
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

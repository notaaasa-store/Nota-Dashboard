import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Navigation from '@/components/Navigation'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  // Fetch all data for KPIs
  const [
    totalRevenue,
    totalProductCosts,
    totalPackagingCosts,
    totalBusinessExpenses,
    inventoryValue,
    totalOrders,
    lowStockItems,
    partner1Contributions,
    partner2Contributions,
  ] = await Promise.all([
    prisma.order.aggregate({
      where: { orderStatus: 'Completed' },
      _sum: { totalRevenue: true },
    }),
    prisma.orderItem.aggregate({
      _sum: { productCost: true },
    }),
    prisma.orderItem.aggregate({
      _sum: { packagingCost: true },
    }),
    prisma.businessExpense.aggregate({
      _sum: { amount: true },
    }),
    prisma.inventory.aggregate({
      _sum: { totalInventoryValue: true },
    }),
    prisma.order.count(),
    prisma.inventory.count({
      where: { stockStatus: 'Low Stock' },
    }),
    prisma.partnerContribution.aggregate({
      where: { partner: 'ALI' },
      _sum: { amount: true },
    }),
    prisma.partnerContribution.aggregate({
      where: { partner: 'Salma' },
      _sum: { amount: true },
    }),
  ])

  const revenue = totalRevenue._sum.totalRevenue || 0
  const productCosts = totalProductCosts._sum.productCost || 0
  const packagingCosts = totalPackagingCosts._sum.packagingCost || 0
  const businessExpenses = totalBusinessExpenses._sum.amount || 0
  const netProfit = revenue - productCosts - packagingCosts - businessExpenses
  const partner1Total = partner1Contributions._sum.amount || 0
  const partner2Total = partner2Contributions._sum.amount || 0
  const totalContributions = partner1Total + partner2Total
  const partnerDifference = Math.abs(partner1Total - partner2Total)

  const kpiCards = [
    { label: 'Total Revenue', value: `EGP ${revenue.toFixed(2)}`, color: 'bg-white' },
    { label: 'Total Business Expenses', value: `EGP ${businessExpenses.toFixed(2)}`, color: 'bg-white' },
    { label: 'Total Product Costs', value: `EGP ${productCosts.toFixed(2)}`, color: 'bg-white' },
    { label: 'Total Packaging Costs', value: `EGP ${packagingCosts.toFixed(2)}`, color: 'bg-white' },
    { label: 'Net Profit', value: `EGP ${netProfit.toFixed(2)}`, color: netProfit >= 0 ? 'bg-white' : 'bg-white' },
    { label: 'Inventory Value', value: `EGP ${(inventoryValue._sum.totalInventoryValue || 0).toFixed(2)}`, color: 'bg-white' },
    { label: 'Total Orders', value: totalOrders.toString(), color: 'bg-white' },
    { label: 'Low Stock Items', value: lowStockItems.toString(), color: lowStockItems > 0 ? 'bg-white' : 'bg-white' },
  ]

  return (
    <div className="min-h-screen bg-[#FFF0F2]">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#2D292A]">Business Dashboard</h1>
          <p className="text-[#7A7173] mt-1">Finance, Inventory & Operations</p>
        </div>
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpiCards.map((kpi) => (
            <div
              key={kpi.label}
              className={`${kpi.color} rounded-lg border border-[#F8DDE3] p-6 shadow-sm`}
            >
              <p className="text-sm text-[#7A7173]">{kpi.label}</p>
              <p className="text-2xl font-semibold text-[#2D292A] mt-2">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Partner Overview */}
        <div className="bg-white rounded-lg border border-[#F8DDE3] p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-[#2D292A] mb-4">Partner Contributions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-[#7A7173]">ALI Total</p>
              <p className="text-xl font-semibold text-[#2D292A] mt-1">EGP {partner1Total.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-[#7A7173]">Salma Total</p>
              <p className="text-xl font-semibold text-[#2D292A] mt-1">EGP {partner2Total.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-[#7A7173]">Total Contributions</p>
              <p className="text-xl font-semibold text-[#2D292A] mt-1">EGP {totalContributions.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-[#7A7173]">Difference</p>
              <p className="text-xl font-semibold text-[#2D292A] mt-1">EGP {partnerDifference.toFixed(2)}</p>
            </div>
          </div>
          <p className="text-sm text-[#7A7173] mt-4">
            {partner1Total > partner2Total
              ? 'ALI has contributed more'
              : partner2Total > partner1Total
              ? 'Salma has contributed more'
              : 'Both partners have contributed equally'}
          </p>
        </div>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg border border-[#F8DDE3] p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#2D292A] mb-4">Recent Orders</h2>
            <p className="text-[#7A7173] text-sm">Coming soon...</p>
          </div>

          {/* Recent Expenses */}
          <div className="bg-white rounded-lg border border-[#F8DDE3] p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#2D292A] mb-4">Recent Expenses</h2>
            <p className="text-[#7A7173] text-sm">Coming soon...</p>
          </div>

          {/* Low Stock Products */}
          <div className="bg-white rounded-lg border border-[#F8DDE3] p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#2D292A] mb-4">Low Stock Products</h2>
            <p className="text-[#7A7173] text-sm">Coming soon...</p>
          </div>

          {/* Best-Selling Products */}
          <div className="bg-white rounded-lg border border-[#F8DDE3] p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#2D292A] mb-4">Best-Selling Products</h2>
            <p className="text-[#7A7173] text-sm">Coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  )
}

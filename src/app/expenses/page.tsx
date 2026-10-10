import { prisma } from '@/lib/prisma'
import Navigation from '@/components/Navigation'
import { deleteExpense } from '@/app/actions'

export const dynamic = 'force-dynamic'

export default async function ExpensesPage() {
  const expenses = await prisma.businessExpense.findMany({
    orderBy: { date: 'desc' },
  })

  return (
    <div className="min-h-screen bg-[#FFF9FA]">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#2D292A]">Business Expenses</h1>
            <p className="text-[#7A7173] mt-1">Track general business expenses (not product-specific)</p>
          </div>
          <button className="px-4 py-2 bg-[#E9AAB8] hover:bg-[#D99A8A] text-white rounded-lg transition-colors font-medium">
            Add Expense
          </button>
        </div>
        {expenses.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#F8DDE3] p-12 text-center shadow-sm">
            <p className="text-[#7A7173] text-lg mb-4">No expenses yet</p>
            <p className="text-[#7A7173] text-sm">
              Add your first business expense to start tracking operational costs.
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
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7173] uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7173] uppercase tracking-wider">
                    Paid By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7173] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#7A7173] uppercase tracking-wider">
                    Recurring
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-[#7A7173] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#F8DDE3]">
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2D292A] font-medium">
                      {expense.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#7A7173]">
                      {expense.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2D292A]">
                      EGP {expense.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#7A7173]">
                      {expense.paidBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#7A7173]">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {expense.isRecurring ? (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#E9AAB8] text-white">
                          Yes
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#F8DDE3] text-[#7A7173]">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-[#E9AAB8] hover:text-[#D99A8A] font-medium mr-3">
                        Edit
                      </button>
                      <DeleteButton expenseId={expense.id} />
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

async function DeleteButton({ expenseId }: { expenseId: string }) {
  return (
    <form action={async () => {
      'use server'
      await deleteExpense(expenseId)
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

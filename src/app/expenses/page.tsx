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
            <h1 className="text-2xl font-semibold text-[#332B30]">Business Expenses</h1>
            <p className="text-[#B7ADA3] mt-1">Track general business expenses (not product-specific)</p>
          </div>
          <button className="px-4 py-2 bg-[#F951AC] hover:bg-[#D99A8A] text-white rounded-lg transition-colors font-medium">
            Add Expense
          </button>
        </div>
        {expenses.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#FFE5F0] p-12 text-center shadow-sm">
            <p className="text-[#B7ADA3] text-lg mb-4">No expenses yet</p>
            <p className="text-[#B7ADA3] text-sm">
              Add your first business expense to start tracking operational costs.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-[#FFE5F0] shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-[#FFE5F0]">
              <thead className="bg-[#FFF9FA]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#B7ADA3] uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#B7ADA3] uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#B7ADA3] uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#B7ADA3] uppercase tracking-wider">
                    Paid By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#B7ADA3] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#B7ADA3] uppercase tracking-wider">
                    Recurring
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-[#B7ADA3] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#FFE5F0]">
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#332B30] font-medium">
                      {expense.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#B7ADA3]">
                      {expense.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#332B30]">
                      EGP {expense.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#B7ADA3]">
                      {expense.paidBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#B7ADA3]">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {expense.isRecurring ? (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#F951AC] text-white">
                          Yes
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#FFE5F0] text-[#B7ADA3]">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button className="text-[#F951AC] hover:text-[#D99A8A] font-medium mr-3">
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
        className="text-[#D65361] hover:text-[#E09090] font-medium"
      >
        Delete
      </button>
    </form>
  )
}

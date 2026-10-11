import { prisma } from '@/lib/prisma'
import Navigation from '@/components/Navigation'
import { deleteOrder } from '@/app/actions'

export const dynamic = 'force-dynamic'

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { orderDate: 'desc' },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  })

  return (
    <div className="min-h-screen bg-[#FFFCFD]">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#332B30]">Orders</h1>
            <p className="text-[#B7ADA3] mt-1">Manage customer orders and track revenue</p>
          </div>
          <button className="px-4 py-2 bg-[#F951AC] hover:bg-[#D99A8A] text-white rounded-lg transition-colors font-medium">
            Add Order
          </button>
        </div>
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#FFE5F0] p-12 text-center shadow-sm">
            <p className="text-[#B7ADA3] text-lg mb-4">No orders yet</p>
            <p className="text-[#B7ADA3] text-sm">
              Add your first order to start tracking sales and revenue.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg border border-[#FFE5F0] p-6 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#332B30]">{order.orderNumber}</h3>
                    <p className="text-sm text-[#B7ADA3]">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-[#B7ADA3]">{order.customerName}</p>
                    {order.customerContact && (
                      <p className="text-sm text-[#B7ADA3]">{order.customerContact}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.orderStatus === 'Completed'
                          ? 'bg-[#A7D7C5] text-white'
                          : order.orderStatus === 'Pending'
                          ? 'bg-[#F5E6A3] text-[#332B30]'
                          : 'bg-[#F5A3A3] text-white'
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.paymentStatus === 'Paid'
                          ? 'bg-[#A7D7C5] text-white'
                          : 'bg-[#F5E6A3] text-[#332B30]'
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-[#FFFCFD] rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-[#332B30] mb-3">Order Items</p>
                  <div className="space-y-2">
                    {order.orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center text-sm"
                      >
                        <div>
                          <p className="text-[#332B30] font-medium">{item.product.name}</p>
                          <p className="text-[#B7ADA3]">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#332B30]">EGP {item.totalRevenue.toFixed(2)}</p>
                          <p className="text-[#A7D7C5] text-xs">Profit: EGP {item.netProfit.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-[#B7ADA3]">Total Revenue</p>
                    <p className="text-[#332B30] font-medium">EGP {order.totalRevenue.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-[#B7ADA3]">Total Cost</p>
                    <p className="text-[#332B30]">EGP {order.totalCost.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-[#B7ADA3]">Net Profit</p>
                    <p className="text-[#A7D7C5] font-semibold">EGP {order.netProfit.toFixed(2)}</p>
                  </div>
                  <div className="flex gap-2 items-end">
                    <button className="flex-1 px-3 py-2 bg-[#FFE5F0] hover:bg-[#F951AC] text-[#332B30] rounded-lg transition-colors text-sm font-medium">
                      Edit
                    </button>
                    <DeleteButton orderId={order.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

async function DeleteButton({ orderId }: { orderId: string }) {
  return (
    <form action={async () => {
      'use server'
      await deleteOrder(orderId)
    }}>
      <button
        type="submit"
        className="px-3 py-2 bg-[#F5A3A3] hover:bg-[#E09090] text-white rounded-lg transition-colors text-sm font-medium"
      >
        Delete
      </button>
    </form>
  )
}

import { prisma } from '@/lib/prisma'
import Navigation from '@/components/Navigation'
import { deleteProduct } from '@/app/actions'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
    include: {
      packagingItems: {
        include: {
          packaging: true,
        },
      },
    },
  })

  return (
    <div className="min-h-screen bg-[#FFF0F2]">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#2D292A]">Products</h1>
            <p className="text-[#7A7173] mt-1">Manage your product catalog and costs</p>
          </div>
          <button className="px-4 py-2 bg-[#D8A0B0] hover:bg-[#D99A8A] text-white rounded-lg transition-colors font-medium">
            Add Product
          </button>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#F0D0D8] p-12 text-center shadow-sm">
            <p className="text-[#7A7173] text-lg mb-4">No products yet</p>
            <p className="text-[#7A7173] text-sm">
              Add your first product to start tracking costs, pricing, inventory, and profit.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg border border-[#F0D0D8] p-6 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#2D292A]">{product.name}</h3>
                    <p className="text-sm text-[#7A7173]">SKU: {product.sku}</p>
                    <p className="text-sm text-[#7A7173]">{product.category}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.stockStatus === 'In Stock'
                        ? 'bg-[#A7D7C5] text-white'
                        : product.stockStatus === 'Low Stock'
                        ? 'bg-[#F5E6A3] text-[#2D292A]'
                        : 'bg-[#F5A3A3] text-white'
                    }`}
                  >
                    {product.stockStatus}
                  </span>
                </div>

                {/* Cost Breakdown */}
                <div className="bg-[#FFF0F2] rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-[#2D292A] mb-3">Cost Breakdown</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#7A7173]">Selling Price</span>
                      <span className="text-[#2D292A] font-medium">EGP {product.sellingPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A7173]">Production Cost</span>
                      <span className="text-[#2D292A]">-EGP {product.productionCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A7173]">Packaging Cost</span>
                      <span className="text-[#2D292A]">-EGP {product.packagingCost.toFixed(2)}</span>
                    </div>
                    {product.packagingItems.length > 0 && (
                      <div className="ml-4 mt-2 space-y-1">
                        {product.packagingItems.map((item) => (
                          <div key={item.id} className="flex justify-between text-xs text-[#7A7173]">
                            <span>• {item.packaging.name}</span>
                            <span>EGP {(item.packaging.costPerUnit * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="border-t border-[#F0D0D8] pt-2 mt-2 flex justify-between">
                      <span className="text-[#7A7173]">Total Cost</span>
                      <span className="text-[#2D292A] font-medium">EGP {product.totalProductCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A7173]">Net Profit</span>
                      <span className="text-[#A7D7C5] font-semibold">EGP {product.netProfitPerUnit.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A7173]">Profit Margin</span>
                      <span className="text-[#2D292A] font-medium">{product.profitMargin.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                {/* Inventory Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[#7A7173]">Inventory</p>
                    <p className="text-[#2D292A] font-medium">{product.inventoryQuantity} units</p>
                  </div>
                  <div>
                    <p className="text-[#7A7173]">Reorder Level</p>
                    <p className="text-[#2D292A] font-medium">{product.reorderLevel} units</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 px-3 py-2 bg-[#F0D0D8] hover:bg-[#D8A0B0] text-[#2D292A] rounded-lg transition-colors text-sm font-medium">
                    Edit
                  </button>
                  <DeleteButton productId={product.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

async function DeleteButton({ productId }: { productId: string }) {
  return (
    <form action={async () => {
      'use server'
      await deleteProduct(productId)
    }}>
      <button
        type="submit"
        className="flex-1 px-3 py-2 bg-[#F5A3A3] hover:bg-[#E09090] text-white rounded-lg transition-colors text-sm font-medium"
      >
        Delete
      </button>
    </form>
  )
}

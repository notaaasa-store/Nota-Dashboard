'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Product Actions
export async function createProduct(data: {
  name: string
  sku: string
  category: string
  description?: string
  productionCost: number
  sellingPrice: number
  inventoryQuantity: number
  reorderLevel: number
}) {
  const packagingCost = 0 // Will be calculated when packaging is assigned
  const totalProductCost = data.productionCost + packagingCost
  const netProfitPerUnit = data.sellingPrice - totalProductCost
  const profitMargin = (netProfitPerUnit / data.sellingPrice) * 100

  const stockStatus =
    data.inventoryQuantity === 0
      ? 'Out of Stock'
      : data.inventoryQuantity <= data.reorderLevel
      ? 'Low Stock'
      : 'In Stock'

  const product = await prisma.product.create({
    data: {
      ...data,
      packagingCost,
      totalProductCost,
      netProfitPerUnit,
      profitMargin,
      stockStatus,
    },
  })

  // Create inventory record
  await prisma.inventory.create({
    data: {
      productId: product.id,
      currentQuantity: data.inventoryQuantity,
      unitCost: totalProductCost,
      totalInventoryValue: data.inventoryQuantity * totalProductCost,
      reorderLevel: data.reorderLevel,
      stockStatus,
    },
  })

  revalidatePath('/products')
  revalidatePath('/inventory')
  revalidatePath('/')
  return product
}

export async function updateProduct(
  id: string,
  data: {
    name?: string
    sku?: string
    category?: string
    description?: string
    productionCost?: number
    sellingPrice?: number
    inventoryQuantity?: number
    reorderLevel?: number
    isActive?: boolean
  }
) {
  const currentProduct = await prisma.product.findUnique({ where: { id } })
  if (!currentProduct) throw new Error('Product not found')

  const productionCost = data.productionCost ?? currentProduct.productionCost
  const sellingPrice = data.sellingPrice ?? currentProduct.sellingPrice
  const inventoryQuantity = data.inventoryQuantity ?? currentProduct.inventoryQuantity
  const reorderLevel = data.reorderLevel ?? currentProduct.reorderLevel

  const totalProductCost = productionCost + currentProduct.packagingCost
  const netProfitPerUnit = sellingPrice - totalProductCost
  const profitMargin = (netProfitPerUnit / sellingPrice) * 100

  const stockStatus =
    inventoryQuantity === 0
      ? 'Out of Stock'
      : inventoryQuantity <= reorderLevel
      ? 'Low Stock'
      : 'In Stock'

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...data,
      productionCost,
      totalProductCost,
      netProfitPerUnit,
      profitMargin,
      stockStatus,
    },
  })

  // Update inventory
  await prisma.inventory.update({
    where: { productId: id },
    data: {
      currentQuantity: inventoryQuantity,
      unitCost: totalProductCost,
      totalInventoryValue: inventoryQuantity * totalProductCost,
      reorderLevel,
      stockStatus,
    },
  })

  revalidatePath('/products')
  revalidatePath('/inventory')
  revalidatePath('/')
  return product
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } })
  revalidatePath('/products')
  revalidatePath('/inventory')
  revalidatePath('/')
}

// Packaging Actions
export async function createPackaging(data: {
  name: string
  type: string
  quantityPurchased: number
  totalPurchaseCost: number
  supplier?: string
  purchaseDate: Date
  notes?: string
}) {
  const costPerUnit = data.totalPurchaseCost / data.quantityPurchased

  const packaging = await prisma.packaging.create({
    data: {
      ...data,
      costPerUnit,
      remainingQuantity: data.quantityPurchased,
    },
  })

  revalidatePath('/packaging')
  revalidatePath('/')
  return packaging
}

export async function updatePackaging(
  id: string,
  data: {
    name?: string
    type?: string
    quantityPurchased?: number
    totalPurchaseCost?: number
    supplier?: string
    purchaseDate?: Date
    remainingQuantity?: number
    notes?: string
  }
) {
  const current = await prisma.packaging.findUnique({ where: { id } })
  if (!current) throw new Error('Packaging not found')

  const quantityPurchased = data.quantityPurchased ?? current.quantityPurchased
  const totalPurchaseCost = data.totalPurchaseCost ?? current.totalPurchaseCost
  const costPerUnit = totalPurchaseCost / quantityPurchased

  const packaging = await prisma.packaging.update({
    where: { id },
    data: {
      ...data,
      quantityPurchased,
      totalPurchaseCost,
      costPerUnit,
    },
  })

  revalidatePath('/packaging')
  revalidatePath('/')
  return packaging
}

export async function deletePackaging(id: string) {
  await prisma.packaging.delete({ where: { id } })
  revalidatePath('/packaging')
  revalidatePath('/')
}

// Printing Actions
export async function createPrinting(data: {
  itemName: string
  productId: string
  quantityProduced: number
  totalPrintingCost: number
  supplier?: string
  date: Date
  notes?: string
}) {
  const costPerUnit = data.totalPrintingCost / data.quantityProduced

  const printing = await prisma.printing.create({
    data: {
      ...data,
      costPerUnit,
    },
  })

  // Update product production cost
  const product = await prisma.product.findUnique({ where: { id: data.productId } })
  if (product) {
    await prisma.product.update({
      where: { id: data.productId },
      data: { productionCost: costPerUnit },
    })
  }

  revalidatePath('/printing')
  revalidatePath('/products')
  revalidatePath('/')
  return printing
}

export async function updatePrinting(
  id: string,
  data: {
    itemName?: string
    productId?: string
    quantityProduced?: number
    totalPrintingCost?: number
    supplier?: string
    date?: Date
    notes?: string
  }
) {
  const current = await prisma.printing.findUnique({ where: { id } })
  if (!current) throw new Error('Printing record not found')

  const quantityProduced = data.quantityProduced ?? current.quantityProduced
  const totalPrintingCost = data.totalPrintingCost ?? current.totalPrintingCost
  const costPerUnit = totalPrintingCost / quantityProduced

  const printing = await prisma.printing.update({
    where: { id },
    data: {
      ...data,
      quantityProduced,
      totalPrintingCost,
      costPerUnit,
    },
  })

  revalidatePath('/printing')
  revalidatePath('/products')
  revalidatePath('/')
  return printing
}

export async function deletePrinting(id: string) {
  await prisma.printing.delete({ where: { id } })
  revalidatePath('/printing')
  revalidatePath('/')
}

// Business Expense Actions
export async function createExpense(data: {
  name: string
  category: string
  amount: number
  paidBy: string
  date: Date
  isRecurring: boolean
  description?: string
  receiptUrl?: string
  notes?: string
}) {
  const expense = await prisma.businessExpense.create({ data })
  revalidatePath('/expenses')
  revalidatePath('/')
  return expense
}

export async function updateExpense(
  id: string,
  data: {
    name?: string
    category?: string
    amount?: number
    paidBy?: string
    date?: Date
    isRecurring?: boolean
    description?: string
    receiptUrl?: string
    notes?: string
  }
) {
  const expense = await prisma.businessExpense.update({
    where: { id },
    data,
  })
  revalidatePath('/expenses')
  revalidatePath('/')
  return expense
}

export async function deleteExpense(id: string) {
  await prisma.businessExpense.delete({ where: { id } })
  revalidatePath('/expenses')
  revalidatePath('/')
}

// Partner Contribution Actions
export async function createContribution(data: {
  date: Date
  partner: string
  description: string
  amount: number
  category: string
  relatedExpenseId?: string
  relatedPackagingId?: string
  relatedPrintingId?: string
  notes?: string
}) {
  const contribution = await prisma.partnerContribution.create({ data })
  revalidatePath('/partners')
  revalidatePath('/')
  return contribution
}

export async function updateContribution(
  id: string,
  data: {
    date?: Date
    partner?: string
    description?: string
    amount?: number
    category?: string
    relatedExpenseId?: string
    relatedPackagingId?: string
    relatedPrintingId?: string
    notes?: string
  }
) {
  const contribution = await prisma.partnerContribution.update({
    where: { id },
    data,
  })
  revalidatePath('/partners')
  revalidatePath('/')
  return contribution
}

export async function deleteContribution(id: string) {
  await prisma.partnerContribution.delete({ where: { id } })
  revalidatePath('/partners')
  revalidatePath('/')
}

// Order Actions
export async function createOrder(data: {
  orderNumber: string
  orderDate: Date
  customerName: string
  customerContact?: string
  orderStatus: string
  paymentStatus: string
  notes?: string
  items: Array<{
    productId: string
    quantity: number
    sellingPrice: number
  }>
}) {
  let totalRevenue = 0
  let totalCost = 0
  let netProfit = 0

  const order = await prisma.order.create({
    data: {
      orderNumber: data.orderNumber,
      orderDate: data.orderDate,
      customerName: data.customerName,
      customerContact: data.customerContact,
      orderStatus: data.orderStatus,
      paymentStatus: data.paymentStatus,
      notes: data.notes,
    },
  })

  // Create order items
  for (const item of data.items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
      include: { packagingItems: { include: { packaging: true } } },
    })

    if (!product) continue

    const packagingCost = product.packagingItems.reduce(
      (sum, pi) => sum + pi.packaging.costPerUnit * pi.quantity,
      0
    )

    const productCost = product.productionCost
    const itemTotalRevenue = item.sellingPrice * item.quantity
    const itemTotalCost = (productCost + packagingCost) * item.quantity
    const itemNetProfit = itemTotalRevenue - itemTotalCost

    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        sellingPrice: item.sellingPrice,
        productCost,
        packagingCost,
        totalRevenue: itemTotalRevenue,
        totalCost: itemTotalCost,
        netProfit: itemNetProfit,
      },
    })

    totalRevenue += itemTotalRevenue
    totalCost += itemTotalCost
    netProfit += itemNetProfit

    // Deduct from inventory if order is completed
    if (data.orderStatus === 'Completed') {
      await prisma.inventory.update({
        where: { productId: item.productId },
        data: {
          currentQuantity: { decrement: item.quantity },
        },
      })
    }
  }

  const updatedOrder = await prisma.order.update({
    where: { id: order.id },
    data: { totalRevenue, totalCost, netProfit },
  })

  revalidatePath('/orders')
  revalidatePath('/inventory')
  revalidatePath('/')
  return updatedOrder
}

export async function updateOrder(
  id: string,
  data: {
    orderNumber?: string
    orderDate?: Date
    customerName?: string
    customerContact?: string
    orderStatus?: string
    paymentStatus?: string
    notes?: string
  }
) {
  const currentOrder = await prisma.order.findUnique({
    where: { id },
    include: { orderItems: true },
  })

  if (!currentOrder) throw new Error('Order not found')

  // Handle status change
  if (data.orderStatus && data.orderStatus !== currentOrder.orderStatus) {
    if (data.orderStatus === 'Completed' && currentOrder.orderStatus !== 'Completed') {
      // Deduct inventory
      for (const item of currentOrder.orderItems) {
        await prisma.inventory.update({
          where: { productId: item.productId },
          data: { currentQuantity: { decrement: item.quantity } },
        })
      }
    } else if (data.orderStatus !== 'Completed' && currentOrder.orderStatus === 'Completed') {
      // Restore inventory
      for (const item of currentOrder.orderItems) {
        await prisma.inventory.update({
          where: { productId: item.productId },
          data: { currentQuantity: { increment: item.quantity } },
        })
      }
    }
  }

  const order = await prisma.order.update({
    where: { id },
    data,
  })

  revalidatePath('/orders')
  revalidatePath('/inventory')
  revalidatePath('/')
  return order
}

export async function deleteOrder(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: { orderItems: true },
  })

  if (order && order.orderStatus === 'Completed') {
    // Restore inventory
    for (const item of order.orderItems) {
      await prisma.inventory.update({
        where: { productId: item.productId },
        data: { currentQuantity: { increment: item.quantity } },
      })
    }
  }

  await prisma.order.delete({ where: { id } })
  revalidatePath('/orders')
  revalidatePath('/inventory')
  revalidatePath('/')
}

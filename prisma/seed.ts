import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create Products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Art Print - Sunset',
        sku: 'AP-001',
        category: 'Art Prints',
        description: 'Beautiful sunset art print on high-quality paper',
        productionCost: 3.00,
        packagingCost: 0.45,
        totalProductCost: 3.45,
        sellingPrice: 12.00,
        netProfitPerUnit: 8.55,
        profitMargin: 71.25,
        inventoryQuantity: 25,
        reorderLevel: 10,
        stockStatus: 'In Stock',
        imageUrl: null,
        isActive: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Sticker Sheet - Flowers',
        sku: 'SS-001',
        category: 'Stickers',
        description: 'Floral sticker sheet with 12 stickers',
        productionCost: 2.50,
        packagingCost: 0.30,
        totalProductCost: 2.80,
        sellingPrice: 8.00,
        netProfitPerUnit: 5.20,
        profitMargin: 65.00,
        inventoryQuantity: 50,
        reorderLevel: 15,
        stockStatus: 'In Stock',
        imageUrl: null,
        isActive: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Greeting Card - Birthday',
        sku: 'GC-001',
        category: 'Cards',
        description: 'Birthday greeting card with envelope',
        productionCost: 1.50,
        packagingCost: 0.35,
        totalProductCost: 1.85,
        sellingPrice: 6.00,
        netProfitPerUnit: 4.15,
        profitMargin: 69.17,
        inventoryQuantity: 8,
        reorderLevel: 10,
        stockStatus: 'Low Stock',
        imageUrl: null,
        isActive: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Art Print - Mountains',
        sku: 'AP-002',
        category: 'Art Prints',
        description: 'Mountain landscape art print',
        productionCost: 3.50,
        packagingCost: 0.45,
        totalProductCost: 3.95,
        sellingPrice: 14.00,
        netProfitPerUnit: 10.05,
        profitMargin: 71.79,
        inventoryQuantity: 30,
        reorderLevel: 10,
        stockStatus: 'In Stock',
        imageUrl: null,
        isActive: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Sticker Sheet - Animals',
        sku: 'SS-002',
        category: 'Stickers',
        description: 'Animal-themed sticker sheet',
        productionCost: 2.50,
        packagingCost: 0.30,
        totalProductCost: 2.80,
        sellingPrice: 8.00,
        netProfitPerUnit: 5.20,
        profitMargin: 65.00,
        inventoryQuantity: 0,
        reorderLevel: 15,
        stockStatus: 'Out of Stock',
        imageUrl: null,
        isActive: true,
      },
    }),
  ])

  console.log('Created products')

  // Create Packaging
  const packaging = await Promise.all([
    prisma.packaging.create({
      data: {
        name: 'Mailer Bag - Small',
        type: 'Mailer',
        quantityPurchased: 500,
        totalPurchaseCost: 100.00,
        costPerUnit: 0.20,
        supplier: 'BoxCo',
        purchaseDate: new Date('2024-01-15'),
        remainingQuantity: 450,
        notes: 'Standard size for art prints',
      },
    }),
    prisma.packaging.create({
      data: {
        name: 'Sticker',
        type: 'Sticker',
        quantityPurchased: 1000,
        totalPurchaseCost: 100.00,
        costPerUnit: 0.10,
        supplier: 'StickerShop',
        purchaseDate: new Date('2024-01-20'),
        remainingQuantity: 920,
        notes: 'Branding stickers',
      },
    }),
    prisma.packaging.create({
      data: {
        name: 'Thank You Card',
        type: 'Card',
        quantityPurchased: 500,
        totalPurchaseCost: 75.00,
        costPerUnit: 0.15,
        supplier: 'CardFactory',
        purchaseDate: new Date('2024-02-01'),
        remainingQuantity: 480,
        notes: 'Premium thank you cards',
      },
    }),
    prisma.packaging.create({
      data: {
        name: 'Tissue Paper',
        type: 'Wrapping',
        quantityPurchased: 200,
        totalPurchaseCost: 40.00,
        costPerUnit: 0.20,
        supplier: 'WrapIt',
        purchaseDate: new Date('2024-02-10'),
        remainingQuantity: 180,
        notes: 'Pink tissue paper',
      },
    }),
  ])

  console.log('Created packaging')

  // Link packaging to products
  await Promise.all([
    prisma.productPackaging.create({
      data: {
        productId: products[0].id,
        packagingId: packaging[0].id,
        quantity: 1,
      },
    }),
    prisma.productPackaging.create({
      data: {
        productId: products[0].id,
        packagingId: packaging[1].id,
        quantity: 1,
      },
    }),
    prisma.productPackaging.create({
      data: {
        productId: products[0].id,
        packagingId: packaging[2].id,
        quantity: 1,
      },
    }),
    prisma.productPackaging.create({
      data: {
        productId: products[1].id,
        packagingId: packaging[0].id,
        quantity: 1,
      },
    }),
    prisma.productPackaging.create({
      data: {
        productId: products[1].id,
        packagingId: packaging[1].id,
        quantity: 1,
      },
    }),
  ])

  console.log('Linked packaging to products')

  // Create Printing records
  const printing = await Promise.all([
    prisma.printing.create({
      data: {
        itemName: 'Art Print - Sunset Batch 1',
        productId: products[0].id,
        quantityProduced: 50,
        totalPrintingCost: 150.00,
        costPerUnit: 3.00,
        supplier: 'PrintPro',
        date: new Date('2024-01-25'),
        notes: 'First batch',
      },
    }),
    prisma.printing.create({
      data: {
        itemName: 'Sticker Sheet - Flowers Batch 1',
        productId: products[1].id,
        quantityProduced: 100,
        totalPrintingCost: 250.00,
        costPerUnit: 2.50,
        supplier: 'StickerPrint',
        date: new Date('2024-02-05'),
        notes: 'Floral design',
      },
    }),
    prisma.printing.create({
      data: {
        itemName: 'Greeting Card - Birthday Batch 1',
        productId: products[2].id,
        quantityProduced: 50,
        totalPrintingCost: 75.00,
        costPerUnit: 1.50,
        supplier: 'CardPrint',
        date: new Date('2024-02-15'),
        notes: 'Birthday design',
      },
    }),
  ])

  console.log('Created printing records')

  // Create Inventory records
  await Promise.all([
    prisma.inventory.create({
      data: {
        productId: products[0].id,
        currentQuantity: 25,
        unitCost: 3.45,
        totalInventoryValue: 86.25,
        reorderLevel: 10,
        stockStatus: 'In Stock',
      },
    }),
    prisma.inventory.create({
      data: {
        productId: products[1].id,
        currentQuantity: 50,
        unitCost: 2.80,
        totalInventoryValue: 140.00,
        reorderLevel: 15,
        stockStatus: 'In Stock',
      },
    }),
    prisma.inventory.create({
      data: {
        productId: products[2].id,
        currentQuantity: 8,
        unitCost: 1.85,
        totalInventoryValue: 14.80,
        reorderLevel: 10,
        stockStatus: 'Low Stock',
      },
    }),
    prisma.inventory.create({
      data: {
        productId: products[3].id,
        currentQuantity: 30,
        unitCost: 3.95,
        totalInventoryValue: 118.50,
        reorderLevel: 10,
        stockStatus: 'In Stock',
      },
    }),
    prisma.inventory.create({
      data: {
        productId: products[4].id,
        currentQuantity: 0,
        unitCost: 2.80,
        totalInventoryValue: 0.00,
        reorderLevel: 15,
        stockStatus: 'Out of Stock',
      },
    }),
  ])

  console.log('Created inventory records')

  // Create Orders
  const orders = await Promise.all([
    prisma.order.create({
      data: {
        orderNumber: 'ORD-001',
        orderDate: new Date('2024-03-01'),
        customerName: 'Alice Johnson',
        customerContact: 'alice@email.com',
        orderStatus: 'Completed',
        paymentStatus: 'Paid',
        totalRevenue: 24.00,
        totalCost: 6.90,
        netProfit: 17.10,
        notes: 'First order',
      },
    }),
    prisma.order.create({
      data: {
        orderNumber: 'ORD-002',
        orderDate: new Date('2024-03-05'),
        customerName: 'Bob Smith',
        customerContact: 'bob@email.com',
        orderStatus: 'Completed',
        paymentStatus: 'Paid',
        totalRevenue: 20.00,
        totalCost: 5.60,
        netProfit: 14.40,
        notes: 'Sticker sheets',
      },
    }),
    prisma.order.create({
      data: {
        orderNumber: 'ORD-003',
        orderDate: new Date('2024-03-10'),
        customerName: 'Carol White',
        customerContact: 'carol@email.com',
        orderStatus: 'Pending',
        paymentStatus: 'Pending',
        totalRevenue: 14.00,
        totalCost: 3.95,
        netProfit: 10.05,
        notes: 'Mountain print',
      },
    }),
    prisma.order.create({
      data: {
        orderNumber: 'ORD-004',
        orderDate: new Date('2024-03-15'),
        customerName: 'David Brown',
        customerContact: 'david@email.com',
        orderStatus: 'Completed',
        paymentStatus: 'Paid',
        totalRevenue: 32.00,
        totalCost: 9.35,
        netProfit: 22.65,
        notes: 'Multiple items',
      },
    }),
  ])

  console.log('Created orders')

  // Create Order Items
  await Promise.all([
    prisma.orderItem.create({
      data: {
        orderId: orders[0].id,
        productId: products[0].id,
        quantity: 2,
        sellingPrice: 12.00,
        productCost: 3.00,
        packagingCost: 0.45,
        totalRevenue: 24.00,
        totalCost: 6.90,
        netProfit: 17.10,
      },
    }),
    prisma.orderItem.create({
      data: {
        orderId: orders[1].id,
        productId: products[1].id,
        quantity: 2,
        sellingPrice: 8.00,
        productCost: 2.50,
        packagingCost: 0.30,
        totalRevenue: 16.00,
        totalCost: 5.60,
        netProfit: 10.40,
      },
    }),
    prisma.orderItem.create({
      data: {
        orderId: orders[1].id,
        productId: products[1].id,
        quantity: 1,
        sellingPrice: 8.00,
        productCost: 2.50,
        packagingCost: 0.30,
        totalRevenue: 8.00,
        totalCost: 2.80,
        netProfit: 5.20,
      },
    }),
    prisma.orderItem.create({
      data: {
        orderId: orders[2].id,
        productId: products[3].id,
        quantity: 1,
        sellingPrice: 14.00,
        productCost: 3.50,
        packagingCost: 0.45,
        totalRevenue: 14.00,
        totalCost: 3.95,
        netProfit: 10.05,
      },
    }),
    prisma.orderItem.create({
      data: {
        orderId: orders[3].id,
        productId: products[0].id,
        quantity: 1,
        sellingPrice: 12.00,
        productCost: 3.00,
        packagingCost: 0.45,
        totalRevenue: 12.00,
        totalCost: 3.45,
        netProfit: 8.55,
      },
    }),
    prisma.orderItem.create({
      data: {
        orderId: orders[3].id,
        productId: products[3].id,
        quantity: 1,
        sellingPrice: 14.00,
        productCost: 3.50,
        packagingCost: 0.45,
        totalRevenue: 14.00,
        totalCost: 3.95,
        netProfit: 10.05,
      },
    }),
  ])

  console.log('Created order items')

  // Create Business Expenses
  const expenses = await Promise.all([
    prisma.businessExpense.create({
      data: {
        name: 'Canva Pro',
        category: 'Software',
        amount: 15.00,
        paidBy: 'ALI',
        date: new Date('2024-03-01'),
        isRecurring: true,
        description: 'Monthly subscription',
      },
    }),
    prisma.businessExpense.create({
      data: {
        name: 'Website Hosting',
        category: 'Hosting',
        amount: 20.00,
        paidBy: 'Salma',
        date: new Date('2024-03-01'),
        isRecurring: true,
        description: 'Monthly hosting fee',
      },
    }),
    prisma.businessExpense.create({
      data: {
        name: 'Domain Renewal',
        category: 'Domain',
        amount: 12.00,
        paidBy: 'ALI',
        date: new Date('2024-02-15'),
        isRecurring: false,
        description: 'Annual domain renewal',
      },
    }),
    prisma.businessExpense.create({
      data: {
        name: 'Facebook Ads',
        category: 'Advertising',
        amount: 50.00,
        paidBy: 'Salma',
        date: new Date('2024-03-10'),
        isRecurring: false,
        description: 'Spring promotion',
      },
    }),
  ])

  console.log('Created business expenses')

  // Create Partner Contributions
  await Promise.all([
    prisma.partnerContribution.create({
      data: {
        date: new Date('2024-01-15'),
        partner: 'ALI',
        description: 'Mailer Bag Purchase',
        amount: 100.00,
        category: 'Packaging',
        relatedPackagingId: packaging[0].id,
        notes: 'Bulk purchase of mailer bags',
      },
    }),
    prisma.partnerContribution.create({
      data: {
        date: new Date('2024-01-25'),
        partner: 'Salma',
        description: 'Art Print Printing',
        amount: 150.00,
        category: 'Printing',
        relatedPrintingId: printing[0].id,
        notes: 'First print batch',
      },
    }),
    prisma.partnerContribution.create({
      data: {
        date: new Date('2024-03-01'),
        partner: 'ALI',
        description: 'Canva Pro Payment',
        amount: 15.00,
        category: 'Software',
        relatedExpenseId: expenses[0].id,
        notes: 'Monthly subscription',
      },
    }),
    prisma.partnerContribution.create({
      data: {
        date: new Date('2024-03-01'),
        partner: 'Salma',
        description: 'Website Hosting Payment',
        amount: 20.00,
        category: 'Hosting',
        relatedExpenseId: expenses[1].id,
        notes: 'Monthly hosting',
      },
    }),
    prisma.partnerContribution.create({
      data: {
        date: new Date('2024-02-05'),
        partner: 'ALI',
        description: 'Sticker Sheet Printing',
        amount: 250.00,
        category: 'Printing',
        relatedPrintingId: printing[1].id,
        notes: 'Floral stickers',
      },
    }),
    prisma.partnerContribution.create({
      data: {
        date: new Date('2024-03-10'),
        partner: 'Salma',
        description: 'Facebook Ads',
        amount: 50.00,
        category: 'Advertising',
        relatedExpenseId: expenses[3].id,
        notes: 'Spring promotion',
      },
    }),
  ])

  console.log('Created partner contributions')

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

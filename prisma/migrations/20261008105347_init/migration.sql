-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "productionCost" REAL NOT NULL DEFAULT 0,
    "packagingCost" REAL NOT NULL DEFAULT 0,
    "totalProductCost" REAL NOT NULL DEFAULT 0,
    "sellingPrice" REAL NOT NULL,
    "netProfitPerUnit" REAL NOT NULL DEFAULT 0,
    "profitMargin" REAL NOT NULL DEFAULT 0,
    "inventoryQuantity" INTEGER NOT NULL DEFAULT 0,
    "reorderLevel" INTEGER NOT NULL DEFAULT 5,
    "stockStatus" TEXT NOT NULL DEFAULT 'In Stock',
    "imageUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Packaging" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantityPurchased" INTEGER NOT NULL,
    "totalPurchaseCost" REAL NOT NULL,
    "costPerUnit" REAL NOT NULL,
    "supplier" TEXT,
    "purchaseDate" DATETIME NOT NULL,
    "remainingQuantity" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ProductPackaging" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "packagingId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "ProductPackaging_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProductPackaging_packagingId_fkey" FOREIGN KEY ("packagingId") REFERENCES "Packaging" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Printing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemName" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantityProduced" INTEGER NOT NULL,
    "totalPrintingCost" REAL NOT NULL,
    "costPerUnit" REAL NOT NULL,
    "supplier" TEXT,
    "date" DATETIME NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Printing_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "currentQuantity" INTEGER NOT NULL DEFAULT 0,
    "unitCost" REAL NOT NULL DEFAULT 0,
    "totalInventoryValue" REAL NOT NULL DEFAULT 0,
    "reorderLevel" INTEGER NOT NULL DEFAULT 5,
    "stockStatus" TEXT NOT NULL DEFAULT 'In Stock',
    "lastUpdated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderNumber" TEXT NOT NULL,
    "orderDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerName" TEXT NOT NULL,
    "customerContact" TEXT,
    "orderStatus" TEXT NOT NULL DEFAULT 'Pending',
    "paymentStatus" TEXT NOT NULL DEFAULT 'Pending',
    "totalRevenue" REAL NOT NULL DEFAULT 0,
    "totalCost" REAL NOT NULL DEFAULT 0,
    "netProfit" REAL NOT NULL DEFAULT 0,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sellingPrice" REAL NOT NULL,
    "productCost" REAL NOT NULL,
    "packagingCost" REAL NOT NULL,
    "totalRevenue" REAL NOT NULL,
    "totalCost" REAL NOT NULL,
    "netProfit" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BusinessExpense" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "paidBy" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "receiptUrl" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PartnerContribution" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "partner" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "category" TEXT NOT NULL,
    "relatedExpenseId" TEXT,
    "relatedPackagingId" TEXT,
    "relatedPrintingId" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PartnerContribution_relatedExpenseId_fkey" FOREIGN KEY ("relatedExpenseId") REFERENCES "BusinessExpense" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PartnerContribution_relatedPackagingId_fkey" FOREIGN KEY ("relatedPackagingId") REFERENCES "Packaging" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PartnerContribution_relatedPrintingId_fkey" FOREIGN KEY ("relatedPrintingId") REFERENCES "Printing" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");

-- CreateIndex
CREATE INDEX "Product_isActive_idx" ON "Product"("isActive");

-- CreateIndex
CREATE INDEX "Packaging_type_idx" ON "Packaging"("type");

-- CreateIndex
CREATE INDEX "ProductPackaging_productId_idx" ON "ProductPackaging"("productId");

-- CreateIndex
CREATE INDEX "ProductPackaging_packagingId_idx" ON "ProductPackaging"("packagingId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPackaging_productId_packagingId_key" ON "ProductPackaging"("productId", "packagingId");

-- CreateIndex
CREATE INDEX "Printing_productId_idx" ON "Printing"("productId");

-- CreateIndex
CREATE INDEX "Printing_date_idx" ON "Printing"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_productId_key" ON "Inventory"("productId");

-- CreateIndex
CREATE INDEX "Inventory_stockStatus_idx" ON "Inventory"("stockStatus");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");

-- CreateIndex
CREATE INDEX "Order_orderDate_idx" ON "Order"("orderDate");

-- CreateIndex
CREATE INDEX "Order_orderStatus_idx" ON "Order"("orderStatus");

-- CreateIndex
CREATE INDEX "Order_paymentStatus_idx" ON "Order"("paymentStatus");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");

-- CreateIndex
CREATE INDEX "BusinessExpense_category_idx" ON "BusinessExpense"("category");

-- CreateIndex
CREATE INDEX "BusinessExpense_date_idx" ON "BusinessExpense"("date");

-- CreateIndex
CREATE INDEX "BusinessExpense_paidBy_idx" ON "BusinessExpense"("paidBy");

-- CreateIndex
CREATE INDEX "PartnerContribution_partner_idx" ON "PartnerContribution"("partner");

-- CreateIndex
CREATE INDEX "PartnerContribution_date_idx" ON "PartnerContribution"("date");

-- CreateIndex
CREATE INDEX "PartnerContribution_category_idx" ON "PartnerContribution"("category");

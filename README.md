# Business Finance Dashboard

A comprehensive business management system for tracking finances, inventory, orders, and partner contributions. Built with Next.js, TypeScript, Prisma, and Tailwind CSS.

## Features

- **Dashboard**: Overview of key financial metrics (Revenue, Expenses, Costs, Profit, Inventory)
- **Products**: Track product costs, pricing, and profitability with automatic calculations
- **Inventory**: Real-time stock tracking with automatic status updates (In Stock/Low Stock/Out of Stock)
- **Orders**: Multi-product order management with automatic revenue and profit calculations
- **Packaging**: Track packaging materials with cost per unit calculations
- **Printing**: Production cost tracking for printed materials
- **Business Expenses**: General business expenses (software, hosting, advertising, etc.)
- **Partner Contributions**: Track payments made by business partners (ALI and Salma)

## Tech Stack

- **Frontend**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **UI Components**: Custom components with light pink/blush aesthetic

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd nota_dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma migrate dev
```

4. Seed the database with sample data (optional):
```bash
npm run seed
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

The application uses the following main entities:

- **Products**: Product details, costs, pricing, and inventory levels
- **Packaging**: Packaging materials with cost per unit calculations
- **Printing**: Production costs for printed materials
- **Inventory**: Stock levels and values for each product
- **Orders**: Customer orders with multiple products
- **OrderItems**: Individual items within orders
- **BusinessExpenses**: General business expenses
- **PartnerContribution**: Payments made by partners (ALI and Salma)

## Key Features

### Automatic Calculations

- **Product Costs**: Production Cost + Packaging Cost = Total Product Cost
- **Profit**: Selling Price - Total Product Cost = Net Profit
- **Profit Margin**: (Net Profit / Selling Price) × 100
- **Packaging Cost Per Unit**: Total Purchase Cost / Quantity Purchased
- **Order Totals**: Automatic calculation of revenue, costs, and profit

### Inventory Management

- Automatic stock deduction when orders are completed
- Stock restoration when orders are cancelled or deleted
- Automatic status updates based on reorder levels
- Low stock warnings

### Partner Tracking

- Track contributions from ALI and Salma
- Automatic calculation of totals and differences
- Link contributions to specific expenses, packaging, or printing

## Currency

All monetary values are displayed in **Egyptian Pound (EGP)**.

## Project Structure

```
nota_dashboard/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Sample data seeding
│   └── migrations/            # Database migrations
├── src/
│   ├── app/
│   │   ├── actions.ts         # Server actions for CRUD operations
│   │   ├── page.tsx           # Dashboard page
│   │   ├── products/          # Products page
│   │   ├── inventory/         # Inventory page
│   │   ├── orders/            # Orders page
│   │   ├── packaging/         # Packaging page
│   │   ├── printing/          # Printing page
│   │   ├── expenses/          # Business expenses page
│   │   └── partners/          # Partner contributions page
│   ├── components/
│   │   ├── Navigation.tsx     # Top navigation bar
│   │   ├── Modal.tsx          # Modal component
│   │   └── ProductForm.tsx    # Product form component
│   └── lib/
│       └── prisma.ts          # Prisma client singleton
├── public/                    # Static assets
└── package.json
```

## Development

### Adding New Data

1. **Products**: Navigate to Products page → Click "Add Product"
2. **Packaging**: Navigate to Packaging page → Click "Add Packaging"
3. **Printing**: Navigate to Printing page → Click "Add Printing Record"
4. **Orders**: Navigate to Orders page → Click "Add Order"
5. **Expenses**: Navigate to Business Expenses page → Click "Add Expense"
6. **Partner Contributions**: Navigate to Partners page → Click "Add Contribution"

### Deleting Records

Each page has a delete button for removing records. When deleting:
- Orders will restore inventory if they were completed
- Related data is handled by database cascading rules

## Production Deployment

### Build the application:

```bash
npm run build
```

### Start the production server:

```bash
npm start
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./prisma/dev.db"
```

## Contributing

This is a private business dashboard for tracking finances and operations. Partners (ALI and Salma) can:

- Add and edit products, orders, expenses
- Track their contributions
- View financial reports
- Manage inventory

## License

Private - For business use only.

## Support

For issues or questions, contact the development team.

'use client'

import { useState } from 'react'
import { createProduct, updateProduct } from '@/app/actions'
import Modal from './Modal'

interface ProductFormProps {
  isOpen: boolean
  onClose: () => void
  product?: any
}

export default function ProductForm({ isOpen, onClose, product }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    sku: product?.sku || '',
    category: product?.category || '',
    description: product?.description || '',
    productionCost: product?.productionCost || 0,
    sellingPrice: product?.sellingPrice || 0,
    inventoryQuantity: product?.inventoryQuantity || 0,
    reorderLevel: product?.reorderLevel || 5,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (product) {
        await updateProduct(product.id, formData)
      } else {
        await createProduct(formData)
      }
      onClose()
      window.location.reload()
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Error saving product. Please try again.')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product ? 'Edit Product' : 'Add Product'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#7A7173] mb-1">Product Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-[#F8DDE3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9AAB8]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#7A7173] mb-1">SKU</label>
          <input
            type="text"
            required
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            className="w-full px-3 py-2 border border-[#F8DDE3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9AAB8]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#7A7173] mb-1">Category</label>
          <input
            type="text"
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-[#F8DDE3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9AAB8]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#7A7173] mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-[#F8DDE3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9AAB8]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#7A7173] mb-1">Production Cost (EGP)</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.productionCost}
              onChange={(e) => setFormData({ ...formData, productionCost: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-[#F8DDE3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9AAB8]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#7A7173] mb-1">Selling Price (EGP)</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.sellingPrice}
              onChange={(e) => setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-[#F8DDE3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9AAB8]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#7A7173] mb-1">Inventory Quantity</label>
            <input
              type="number"
              required
              value={formData.inventoryQuantity}
              onChange={(e) => setFormData({ ...formData, inventoryQuantity: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-[#F8DDE3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9AAB8]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#7A7173] mb-1">Reorder Level</label>
            <input
              type="number"
              required
              value={formData.reorderLevel}
              onChange={(e) => setFormData({ ...formData, reorderLevel: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-[#F8DDE3] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9AAB8]"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-[#F8DDE3] hover:bg-[#E9AAB8] text-[#2D292A] rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-[#E9AAB8] hover:bg-[#D99A8A] text-white rounded-lg transition-colors font-medium"
          >
            {product ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

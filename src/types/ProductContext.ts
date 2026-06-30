export interface Product {
  id: number
  qty: number
  title: string
  price: number
  currencyId: 'CLP'
  currencyFormat: '$'
  category: string
  isFreeShipping: boolean
  description: string
  sku: string
}

export interface ProductContextType {
  product: Product[]
  filteredProducts: Product[]
  orderedProducts: Product[]
  setFilteredProducts: (filteredProducts: Product[]) => void
  setOrderedProducts: (orderedProducts: Product[]) => void
  setProduct: (product: Product[]) => void
}

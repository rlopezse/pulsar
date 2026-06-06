import { CartContext } from './CartContext'

import type { ReactNode } from 'react'
import type { Cart } from '../../types/CartContext'
import { useState } from 'react'

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({ products: [], checkout: 0 })
  const [isOpen, setIsOpen] = useState(false)

  console.log(cart);

  return (
    <CartContext.Provider value={{ cart, isOpen, setIsOpen, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

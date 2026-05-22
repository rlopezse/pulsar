import { useCartContext } from '../../../context/Cart/useCartContext'
import type { Product } from '../../../types/ProductContext'
import formatPrice from '../../../utils/formatPrice'

import s from './ProductCard.module.css'

function ProductCard({ data }: { data: Product }) {
  const { cart, setIsOpen, setCart } = useCartContext()

  const addToCart = () => {
    if (cart.checkout >= 2000000) {
      alert('Acaso crees que somos millonarios!?')
      return
    }
    setCart({
      products: [...cart.products, data],
      checkout: cart.checkout + data.price,
    })

    setIsOpen(true)
  }

  return (
    <div className={s.product_card}>
      {data.isFreeShipping && (
        <span className={s.product_card_badge}>Envío Gratis</span>
      )}
      <img
        className={s.product_card_image}
        src={`/static/products/${data.sku}.webp`}
        alt={data.title}
        loading="lazy"
      />
      <p className={s.product_card_title}>{data.title}</p>
      <p className={s.product_card_price}>{formatPrice(data.price)}</p>
      <p className={s.product_card_installments}>
        <small>o 12 cuotas de {formatPrice(data.price / 12)} sin interés</small>
      </p>
      <button className={s.product_card_button} onClick={() => addToCart()}>
        <span className={s.product_icon_cart}></span>
        Agregar al carrito
      </button>
    </div>
  )
}

export default ProductCard

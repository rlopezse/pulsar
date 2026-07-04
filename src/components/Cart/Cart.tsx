import s from './Cart.module.scss'
import formatPrice from '../../utils/formatPrice'
import { useCartContext } from '../../context/Cart/useCartContext'
import { useProductContext } from '../../context/Product/useProductContext'
import type { Product } from '../../types/ProductContext'

const Cart = () => {
  const { cart, isOpen, setCart, setIsOpen } = useCartContext()
  const { product } = useProductContext()

  if (product.length === 0) {
    return <></>
  }

  const removeFromCart = (product: Product) => {
    let updatedCheckout = 0
    const removedProducts = cart.products.filter((p) => {
      if (p.id === product.id) {
        updatedCheckout += p.price
        return false
      } else {
        return true
      }
    })

    setCart({
      products: removedProducts,
      checkout: cart.checkout - updatedCheckout,
    })
  }

  const singleAddToCart = (product: Product) => {
    let updatedCart = cart.products.map(function (item) {
      if (item.id === product.id) {
        return {
          ...item,
          qty: item.qty + 1,
          price: item.price + 1000000,
        }
      }
      return item
    })

    //console.log(updatedCart)

    setCart({
      products: [...updatedCart],
      checkout: cart.checkout + product.price,
    })
  }

  return (
    <div className={`${s.cart} ${isOpen ? s.cart_isOpen : ''}`}>
      <button className={s.cart_button} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <span className={s.cart_icon}>
            <i className={s.cart_button_icon_close}></i>
          </span>
        ) : (
          <>
            <span className={s.cart_icon}>
              <i className={s.cart_button_icon}></i>
            </span>
            <span className={s.cart_button_length}>{cart.products.length}</span>
          </>
        )}
      </button>
      <div className={s.cart_container}>
        <div className={s.cart_title}>
          <p>Productos Seleccionados: {cart.products.length}</p>
        </div>
        <div className={s.cart_body}>
          {cart.products.length === 0 ? (
            <p style={{ textAlign: 'center' }}>
              Agrega algo al carrito para mostrarlo aquí ;)
            </p>
          ) : (
            cart.products.map((product) => (
              <div key={product.id} className={s.cart_items}>
                <div className={s.cart_items_img}>
                  <img
                    src={`/static/products/${product.sku}.webp`}
                    alt={product.title}
                  />
                </div>
                <div>
                  <p className={s.cart_items_title}>{product.title}</p>
                  <p className={s.cart_items_qty}>Cantidad: {product.qty} </p>
                </div>
                <div className={s.cart_items_actions}>
                  <button
                    className={s.cart_items_remove}
                    onClick={() => {
                      removeFromCart(product)
                    }}
                  >
                    <i className={s.cart_items_remove_icon}></i>
                  </button>
                  <p className={s.cart_items_price}>
                    {formatPrice(product.price)}
                  </p>
                  <div className={s.cart_items_toggleqty}>
                    <button
                      className={`${s.cart_items_toggleqty_minus} ${s.cart_items_toggleqty_minus_disabled}`}
                    >
                      -
                    </button>
                    <button className={s.cart_items_toggleqty_plus} onClick={() =>
                      singleAddToCart(product)
                    }>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className={s.cart_bottom}>
          <div className={s.cart_bottom_total}>
            <p className={s.cart_bottom_label}>Total a pagar:</p>
            <p className={s.cart_bottom_amount}>{formatPrice(cart.checkout)}</p>
          </div>
          <button
            className={s.cart_bottom_checkout}
            onClick={() =>
              alert(
                cart.checkout === 0
                  ? 'Agrega productos al carrito'
                  : 'Total a pagar: ' + formatPrice(cart.checkout) + ' Pesos',
              )
            }
          >
            Ir a pagar
          </button>
          <button
            className={s.cart_bottom_clear}
            onClick={() => setCart({ products: [], checkout: 0 })}
          >
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart

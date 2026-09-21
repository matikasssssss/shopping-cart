import { CartIcon, ClearCartIcon } from './Icons'
import { useId } from 'react'
import './Cart.css'
import { useCart } from '../hooks/useCart'

const CartItem = ({ thumbnail, title, price, quantity, addToCart }) => {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>${price}</p>
      </div>
      <footer>
        <small> Qty: {quantity}</small>
        <button onClick={addToCart}> +</button>
      </footer>
    </li>
  )
}

export function Cart() {
  const cartCheckboxIconId = useId()
  const { cart, clearCart, addToCart } = useCart()

  return (
    <>
      <label htmlFor={cartCheckboxIconId} className="cart-button">
        <CartIcon />
      </label>
      <input type="checkbox" id={cartCheckboxIconId} hidden />
      <aside className="cart">
        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
        <ul>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              {...item}
              addToCart={() => addToCart(item)}
            />
          ))}
        </ul>
      </aside>
    </>
  )
}

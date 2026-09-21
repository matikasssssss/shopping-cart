import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons'
import { useCart } from '../hooks/useCart'

export function Products({ products }) {
  const { addToCart, cart, removeFromCart } = useCart()
  const checkProductInCart = (productId) => {
    return cart.some((item) => item.id === productId)
  }

  return (
    <div className="products">
      <ul>
        {products.map((product) => {
          const isInCart = checkProductInCart(product.id)
          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <h3>{product.title}</h3> ${product.price}
              </div>
              <div>
                <button
                  style={{ backgroundColor: isInCart ? 'red' : 'green' }}
                  onClick={() => {
                    isInCart ? removeFromCart(product) : addToCart(product)
                  }}
                >
                  {isInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

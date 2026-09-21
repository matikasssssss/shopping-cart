import { Header } from './components/Header'
import { Products } from './components/Products'
import { products as initialProducts } from './mocks/products.json'
import { useFilters } from './hooks/useFilters'
import { Cart } from './components/Cart'
import { CartProvider } from './context/cart'

function App() {
  const { filterProducts } = useFilters()
  const filteredProducts = filterProducts(initialProducts)

  return (
    <div>
      <CartProvider>
        <Header />
        <Products products={filteredProducts}></Products>
        <Cart />
      </CartProvider>
    </div>
  )
}

export default App

import { Header } from './components/Header'
import { Products } from './components/Products'
import { products as initialProducts } from './mocks/products.json'
import { useFilters } from './hooks/useFilters'

function App() {
  const { filterProducts } = useFilters()
  const filteredProducts = filterProducts(initialProducts)

  return (
    <div>
      <>
        <Header />
        <Products products={filteredProducts}></Products>
      </>
    </div>
  )
}

export default App

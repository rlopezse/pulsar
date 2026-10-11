import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartContextProvider } from './context/Cart/CartContextProvider'
import { ProductContextProvider } from './context/Product/ProductContextProvider'
import { FilterContextProvider } from './context/Filter/FilterContextProvider'
import App from './components/App/App.tsx'
import './styles/reset.css'
import './styles/variables.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductContextProvider>
      <FilterContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartContextProvider>
      </FilterContextProvider>
    </ProductContextProvider>
  </StrictMode>,
)

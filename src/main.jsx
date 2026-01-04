import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ProductsProvider } from './context/ProductsContext.jsx'
import { OrdersProvider } from './context/OrdersContext.jsx'
import { ToastProvider } from './components/common/Toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <OrdersProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </OrdersProvider>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  </StrictMode>,
)

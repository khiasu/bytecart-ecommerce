import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from '@components/templates/AppLayout/AppLayout'
import Cart from '@pages/Cart'
import Checkout from '@pages/Checkout'
import Home from '@pages/Home'
import NotFound from '@pages/NotFound'
import Orders from '@pages/Orders'
import Products from '@pages/Products'
import PrivacyPolicy from '@pages/PrivacyPolicy'
import Terms from '@pages/Terms'
import Cookies from '@pages/Cookies'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'orders', element: <Orders /> },
      { path: 'privacy', element: <PrivacyPolicy /> },
      { path: 'terms', element: <Terms /> },
      { path: 'cookies', element: <Cookies /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}

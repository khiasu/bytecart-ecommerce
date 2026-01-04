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
import About from '@pages/About'
import Contact from '@pages/Contact'
import FAQ from '@pages/FAQ'
import Blog from '@pages/Blog'
import Shipping from '@pages/Shipping'
import Returns from '@pages/Returns'
import Support from '@pages/Support'
import SizeGuide from '@pages/SizeGuide'
import Payment from '@pages/Payment'
import SignIn from '@pages/SignIn'
import Offers from '@pages/Offers'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'offers', element: <Offers /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'orders', element: <Orders /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'blog', element: <Blog /> },
      { path: 'shipping', element: <Shipping /> },
      { path: 'returns', element: <Returns /> },
      { path: 'support', element: <Support /> },
      { path: 'size-guide', element: <SizeGuide /> },
      { path: 'payment', element: <Payment /> },
      { path: 'signin', element: <SignIn /> },
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

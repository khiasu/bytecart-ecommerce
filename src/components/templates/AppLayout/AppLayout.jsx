import { Outlet } from 'react-router-dom'
import Header from '@components/organisms/Header/Header'
import Footer from '@components/organisms/Footer/Footer'

export default function AppLayout() {
  return (
    <div className="min-h-dvh bg-neutral-50 text-neutral-900">
      <Header />
      <main className="min-h-[calc(100dvh-64px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

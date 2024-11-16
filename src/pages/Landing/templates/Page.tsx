import { ReactNode } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
interface PageProps {
  children?: ReactNode
}

function Page({ children }: PageProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Page

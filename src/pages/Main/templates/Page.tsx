import { ReactNode } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
interface PageProps {
  children?: ReactNode
  hideHeader?: boolean
}

function Page({ children, hideHeader }: PageProps) {
  return (
    <>
      {hideHeader ? null : <Header />}
      {children}
      <Footer />
    </>
  )
}

export default Page

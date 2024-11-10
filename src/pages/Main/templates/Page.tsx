import { ReactNode } from 'react'
interface PageProps {
  children?: ReactNode
  hideHeader?: boolean
}

function Page({ children, hideHeader }: PageProps) {
  return (
    <>
      {/* {hideHeader
        ? null
        : <Header />
      } */}

      {children}
      {/* <Footer /> */}
    </>
  )
}

export default Page

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { HomePage } from '@/pages/Home'

import { RouterPath } from './path'
import { Camera } from '@/pages/Camera'

const router = createBrowserRouter([
  {
    path: RouterPath.home,
    element: <HomePage />,
  },
  { path: RouterPath.camera, element: <Camera /> },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}

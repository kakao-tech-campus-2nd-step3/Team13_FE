import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { LoginPage } from '@/pages/Login'

import { RouterPath } from './path'

const router = createBrowserRouter([
  {
    path: RouterPath.login,
    element: <LoginPage />,
  },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}

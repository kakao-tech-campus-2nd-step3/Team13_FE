import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { LoginPage } from '@/pages/Login'

import { RouterPath } from './path'
import { Recipients } from '@/pages/Recipients'

const router = createBrowserRouter([
  {
    path: RouterPath.login,
    element: <LoginPage />,
  },
  {
    path: RouterPath.recipients,
    element: <Recipients />,
  },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}

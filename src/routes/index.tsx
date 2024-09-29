import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { LoginPage } from '@/pages/Login'

import { RouterPath } from './path'
import { Recipients } from '@/pages/Recipients'
import { Layout } from '@/components/features/Layout'

const router = createBrowserRouter([
  {
    path: RouterPath.root,
    element: <Layout />,
    children: [
      {
        path: RouterPath.login,
        element: <LoginPage />,
      },
      {
        path: RouterPath.recipients,
        element: <Recipients />,
      },
      {
        path: RouterPath.chart,
      },
    ],
  },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}

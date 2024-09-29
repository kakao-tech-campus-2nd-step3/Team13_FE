import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { LoginPage } from '@/pages/Login'

import { RouterPath } from './path'
import { Recipients } from '@/pages/Recipients'
import { Layout } from '@/components/features/Layout'
import { DIY } from '@/pages/Chart/DIY'

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
        children: [{ path: RouterPath.DIY, element: <DIY /> }],
      },
    ],
  },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}

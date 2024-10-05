import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { LoginPage } from '@/pages/Login'
import { HomePage } from '@/pages/Home'
import { CameraPage } from '@/pages/Camera'
import { AudioRecordPage } from '@/pages/AudioRecord'
import { CareLogPage } from '@/pages/CareLog'
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
      {
        path: RouterPath.home,
        element: <HomePage />,
      },
      { path: RouterPath.camera, element: <CameraPage /> },
      { path: RouterPath.audioRecord, element: <AudioRecordPage /> },
      { path: RouterPath.careLog, element: <CareLogPage /> },
      { path: RouterPath.notFound, element: <HomePage /> },
    ],
  },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}

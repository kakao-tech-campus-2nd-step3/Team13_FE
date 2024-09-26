import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RouterPath } from './path'

import { HomePage } from '@/pages/Home'
import { CameraPage } from '@/pages/Camera'
import { AudioRecordPage } from '@/pages/AudioRecord'

const router = createBrowserRouter([
  {
    path: RouterPath.home,
    element: <HomePage />,
  },
  { path: RouterPath.camera, element: <CameraPage /> },
  { path: RouterPath.audioRecord, element: <AudioRecordPage /> },
  { path: RouterPath.notFound, element: <HomePage /> },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}

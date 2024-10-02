import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RouterPath } from './path'

import { HomePage } from '@/pages/Home'
import { CameraPage } from '@/pages/Camera'
import { AudioRecordPage } from '@/pages/AudioRecord'
import { CareLogPage } from '@/pages/CareLog'

const router = createBrowserRouter([
  {
    path: RouterPath.home,
    element: <HomePage />,
  },
  { path: RouterPath.camera, element: <CameraPage /> },
  { path: RouterPath.audioRecord, element: <AudioRecordPage /> },
  { path: RouterPath.careLog, element: <CareLogPage /> },
  { path: RouterPath.notFound, element: <HomePage /> },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}

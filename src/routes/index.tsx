import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RouterPath } from './path'

import { HomePage } from '@/pages/Home'
import { CameraPage } from '@/pages/Camera'
import { AudioRecordPage } from '@/pages/AudioRecord'
import { CareLogPage } from '@/pages/CareLog'
import { SpeechToTextPage } from '@/pages/SpeechToText'
import { OCRPage } from '@/pages/OCR'
import { LoginPage } from '@/pages/Login'
import { Recipients } from '@/pages/Recipients'
import { Layout } from '@/components/features/Layout'
import { DIY } from '@/pages/Chart/DIY'

const router = createBrowserRouter([
  {
    path: RouterPath.root,
    element: <Layout />,
    children: [
      {
        path: RouterPath.home,
        element: <HomePage />,
      },
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

      { path: RouterPath.camera, element: <CameraPage /> },
      { path: RouterPath.audioRecord, element: <AudioRecordPage /> },
      { path: RouterPath.careLog, element: <CareLogPage /> },
      { path: RouterPath.speechToText, element: <SpeechToTextPage /> },
      { path: RouterPath.ocr, element: <OCRPage /> },
      { path: RouterPath.notFound, element: <HomePage /> },
    ],
  },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}

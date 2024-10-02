import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { RouterPath } from './path'

import { HomePage } from '@/pages/Home'
import { CameraPage } from '@/pages/Camera'
import { AudioRecordPage } from '@/pages/AudioRecord'
import { CareLogPage } from '@/pages/CareLog'
import { SpeechToTextPage } from '@/pages/SpeechToText'
import { OCRPage } from '@/pages/OCR'

const router = createBrowserRouter([
  {
    path: RouterPath.home,
    element: <HomePage />,
  },
  { path: RouterPath.camera, element: <CameraPage /> },
  { path: RouterPath.audioRecord, element: <AudioRecordPage /> },
  { path: RouterPath.careLog, element: <CareLogPage /> },
  { path: RouterPath.speechToText, element: <SpeechToTextPage /> },
  { path: RouterPath.ocr, element: <OCRPage /> },
  { path: RouterPath.notFound, element: <HomePage /> },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}

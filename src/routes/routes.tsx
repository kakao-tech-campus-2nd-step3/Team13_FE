import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RouterPath } from './path'

// NON-ADMIN
import { HomePage } from '@/pages/Home/Home'
import { CameraPage } from '@/pages/Camera/Camera'
import { AudioRecordPage } from '@/pages/AudioRecord/AudioRecord'
import { CareLogPage } from '@/pages/CareLog/CareLog'
import { SpeechToTextPage } from '@/pages/SpeechToText/SpeechToText'
import { OCRPage } from '@/pages/OCR/OCR'
import { LoginPage } from '@/pages/Login/Login'
import { RecipientsPage } from '@/pages/Recipients/Recipients'
import { Layout } from '@/components/common/Layout/Layout'
import { DIYPage } from '@/pages/Chart/DIY/DIY'
import { OCRCheckPage } from '@/pages/OCR/OCRCheck/OCRCheck'
import { DetailLogPage } from '@/pages/CareLog/DetailLog/DetailLog'
import { SharePage } from '@/pages/Share/Share'
import { ChartPage } from '@/pages/Chart/Chart'
import { OCRLoadingPage } from '@/pages/OCR/OCRLoading/OCRLoading'
import { MultipleChoicePage } from '@/pages/MultipleChoice/MultipleChoice'
import { MultipleLogPage } from '@/pages/CareLog/MultipleLog/MultipleLog'

// ADMIN
import { CareWorkerPage } from '@/pages/admin/CareWorkerPage'
import { GuardianPage } from '@/pages/admin/GuardianPage'
import { InstitutionPage } from '@/pages/admin/InstitutionPage'
import { RecipientPage } from '@/pages/admin/RecipientPage'

const router = createBrowserRouter([
  {
    path: RouterPath.ROOT,
    element: <Layout />,
    children: [
      {
        path: RouterPath.HOME,
        element: <HomePage />,
      },
      {
        path: RouterPath.LOGIN,
        element: <LoginPage />,
      },
      {
        path: RouterPath.RECIPIENTS,
        element: <RecipientsPage />,
      },
      {
        path: RouterPath.CHART,
        element: <ChartPage />,
      },
      {
        path: RouterPath.DIY,
        element: <DIYPage />,
      },
      {
        path: RouterPath.SHARE,
        element: <SharePage />,
      },
      {
        path: RouterPath.CAMERA,
        element: <CameraPage />,
      },
      {
        path: RouterPath.AUDIO_RECORD,
        element: <AudioRecordPage />,
      },
      {
        path: RouterPath.MULTIPLE_CHOICE,
        element: <MultipleChoicePage />,
      },
      {
        path: RouterPath.CARE_LOG,
        element: <CareLogPage />,
      },
      {
        path: RouterPath.DETAIL_LOG,
        element: <DetailLogPage />,
      },
      {
        path: RouterPath.MULTIPLE_LOG,
        element: <MultipleLogPage />,
      },
      {
        path: RouterPath.SPEECH_TO_TEXT,
        element: <SpeechToTextPage />,
      },
      {
        path: RouterPath.OCR,
        element: <OCRPage />,
      },
      {
        path: RouterPath.OCR_LOADING,
        element: <OCRLoadingPage />,
      },
      {
        path: RouterPath.OCR_CHECKING,
        element: <OCRCheckPage />,
      },
      {
        path: RouterPath.ADMIN.CAREWORKER,
        element: <CareWorkerPage />,
      },
      {
        path: RouterPath.ADMIN.GUARDIAN,
        element: <GuardianPage />,
      },
      {
        path: RouterPath.ADMIN.INSTITUTION,
        element: <InstitutionPage />,
      },
      {
        path: RouterPath.ADMIN.RECIPIENT,
        element: <RecipientPage />,
      },
      {
        path: RouterPath.NOT_FOUND,
        element: <HomePage />,
      },
    ],
  },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}

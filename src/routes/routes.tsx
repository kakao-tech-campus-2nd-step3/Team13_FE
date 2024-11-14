import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RouterPath } from './path'

// Pages
import { HomePage } from '@/pages/Home/Home'
import { CameraPage } from '@/pages/Camera/Camera'
import { AudioRecordPage } from '@/pages/AudioRecord/AudioRecord'
import { CareLogPage } from '@/pages/CareLog/CareLog'
import { SpeechToTextPage } from '@/pages/SpeechToText/SpeechToText'
import { OCRPage } from '@/pages/OCR/OCR'
import { LoginPage } from '@/pages/Login/Login'
import { RecipientsPage } from '@/pages/Recipients/Recipients'
import { AdminLayout, Layout } from '@/components/common/Layout/Layout'
import { SignificantPage } from '@/pages/Significant/Significant'
import { OCRCheckPage } from '@/pages/OCR/OCRCheck/OCRCheck'
import { SharePage } from '@/pages/Share/Share'
import { ChartPage } from '@/pages/Chart/Chart'
import { OCRLoadingPage } from '@/pages/OCR/OCRLoading/OCRLoading'
import { BodyChoicePage } from '@/pages/Choice/Body/BodyChoice'
import { CognitiveChoicePage } from '@/pages/Choice/Cognitive/CognitiveChoice'
import { RecoveryChoicePage } from '@/pages/Choice/Recovery/RecoveryChoice'
import { NursingChoicePage } from '@/pages/Choice/Nursing/NursingChoice'
import { MyPage } from '@/pages/MyPage/MyPage'

// Admin Pages
import { CareWorkerPage } from '@/pages/admin/CareWorkerPage'
import { GuardianPage } from '@/pages/admin/GuardianPage'
import { InstitutionPage } from '@/pages/admin/InstitutionPage'
import { RecipientPage } from '@/pages/admin/RecipientPage'
import { BodyChoiceLogPage } from '@/pages/CareLog/ChoiceLog/Body/BodyChoiceLog'
import { SignificantLogPage } from '@/pages/CareLog/SignificantLog/SignificantLog'
import { CognitiveChoiceLogPage } from '@/pages/CareLog/ChoiceLog/Cognitive/CognitiveChoiceLog'
import { NursingChoiceLogPage } from '@/pages/CareLog/ChoiceLog/Nursing/NursingChoiceLog'
import { RecoveryChoiceLogPage } from '@/pages/CareLog/ChoiceLog/Recovery/RecoveryChoiceLog'

import { LandingPage } from '@/pages/Landing/Landing'
import { CalendarPage } from '@/pages/Calendar/Calendar'
const router = createBrowserRouter([
  {
    path: RouterPath.LANDING,
    element: <LandingPage />,
  },
  {
    path: RouterPath.HOME,
    element: <HomePage />,
  },
  {
    path: RouterPath.ROOT,
    element: <Layout />,
    children: [
      { path: RouterPath.CALENDAR, element: <CalendarPage /> },
      { path: RouterPath.LOGIN, element: <LoginPage /> },
      { path: RouterPath.RECIPIENTS, element: <RecipientsPage /> },
      { path: RouterPath.CHART, element: <ChartPage /> },
      { path: RouterPath.SHARE, element: <SharePage /> },
      { path: RouterPath.CAMERA, element: <CameraPage /> },
      { path: RouterPath.AUDIO_RECORD, element: <AudioRecordPage /> },
      { path: RouterPath.CHOICE.BODY, element: <BodyChoicePage /> },
      { path: RouterPath.CHOICE.COGNITIVE, element: <CognitiveChoicePage /> },
      { path: RouterPath.CHOICE.NURSING, element: <NursingChoicePage /> },
      { path: RouterPath.CHOICE.RECOVERY, element: <RecoveryChoicePage /> },
      {
        path: RouterPath.SIGNIFICANT.BODY,
        element: (
          <SignificantPage
            step={1}
            title="신체 활동 지원"
            navigateTo={RouterPath.CHOICE.COGNITIVE}
          />
        ),
      },
      {
        path: RouterPath.SIGNIFICANT.COGNITIVE,
        element: (
          <SignificantPage
            step={2}
            title="인지관리 및 의사소통"
            navigateTo={RouterPath.CHOICE.NURSING}
          />
        ),
      },
      {
        path: RouterPath.SIGNIFICANT.NURSING,
        element: (
          <SignificantPage
            step={3}
            title="건강 및 간호 관리"
            navigateTo={RouterPath.CHOICE.RECOVERY}
          />
        ),
      },
      {
        path: RouterPath.SIGNIFICANT.RECOVERY,
        element: (
          <SignificantPage step={4} title="기능 회복 훈련" navigateTo={RouterPath.RECIPIENTS} />
        ),
      },

      { path: RouterPath.CARE_LOG, element: <CareLogPage /> },
      { path: RouterPath.CHOICE_LOG.BODY, element: <BodyChoiceLogPage /> },
      { path: RouterPath.CHOICE_LOG.COGNITIVE, element: <CognitiveChoiceLogPage /> },
      { path: RouterPath.CHOICE_LOG.NURSING, element: <NursingChoiceLogPage /> },
      { path: RouterPath.CHOICE_LOG.RECOVERY, element: <RecoveryChoiceLogPage /> },
      {
        path: RouterPath.SIGNIFICANT_LOG.BODY,
        element: (
          <SignificantLogPage
            step={1}
            title="신체 활동 지원"
            navigateTo={RouterPath.CHOICE_LOG.COGNITIVE}
          />
        ),
      },
      {
        path: RouterPath.SIGNIFICANT_LOG.COGNITIVE,
        element: (
          <SignificantLogPage
            step={2}
            title="인지관리 및 의사소통"
            navigateTo={RouterPath.CHOICE_LOG.NURSING}
          />
        ),
      },
      {
        path: RouterPath.SIGNIFICANT_LOG.NURSING,
        element: (
          <SignificantLogPage
            step={3}
            title="건강 및 간호 관리"
            navigateTo={RouterPath.CHOICE_LOG.RECOVERY}
          />
        ),
      },
      {
        path: RouterPath.SIGNIFICANT_LOG.RECOVERY,
        element: (
          <SignificantLogPage step={4} title="기능 회복 훈련" navigateTo={RouterPath.CALENDAR} />
        ),
      },
      { path: RouterPath.SPEECH_TO_TEXT, element: <SpeechToTextPage /> },
      { path: RouterPath.OCR, element: <OCRPage /> },
      { path: RouterPath.OCR_LOADING, element: <OCRLoadingPage /> },
      { path: RouterPath.OCR_CHECKING, element: <OCRCheckPage /> },
      { path: RouterPath.MYPAGE, element: <MyPage /> },

      { path: RouterPath.NOT_FOUND, element: <HomePage /> },
    ],
  },

  // Admin Routes
  {
    path: RouterPath.ROOT,
    element: <AdminLayout />,
    children: [
      { path: RouterPath.ADMIN.CAREWORKER, element: <CareWorkerPage /> },
      { path: RouterPath.ADMIN.GUARDIAN, element: <GuardianPage /> },
      { path: RouterPath.ADMIN.INSTITUTION, element: <InstitutionPage /> },
      { path: RouterPath.ADMIN.RECIPIENT, element: <RecipientPage /> },
    ],
  },
])

export const Routes = () => {
  return <RouterProvider router={router} />
}

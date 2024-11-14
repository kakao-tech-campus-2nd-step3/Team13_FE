export const RouterPath = {
  ROOT: '/',
  HOME: '/',
  ROLE: '/role',
  LOGIN: '/login',
  SELECT: '/select',
  CALENDAR: '/calendar',
  RECIPIENTS: '/recipients',
  CHART: '/chart',
  CAMERA: '/camera',
  AUDIO_RECORD: {
    BODY: '/chart/audioRecord/body',
    COGNITIVE: '/chart/audioRecord/cognitive',
    NURSING: '/chart/audioRecord/nursing',
    RECOVERY: '/chart/audioRecord/recovery',
  },
  AUDIO_CHECK: {
    BODY: '/chart/audioCheck/body',
    COGNITIVE: '/chart/audioCheck/cognitive',
    NURSING: '/chart/audioCheck/nursing',
    RECOVERY: '/chart/audioCheck/recovery',
  },
  SIGNIFICANT: {
    BODY: '/chart/significant/body',
    COGNITIVE: '/chart/significant/cognitive',
    NURSING: '/chart/significant/nursing',
    RECOVERY: '/chart/significant/recovery',
  },
  CHOICE: {
    BODY: '/chart/choice/body',
    COGNITIVE: '/chart/choice/cognitive',
    NURSING: '/chart/choice/nursing',
    RECOVERY: '/chart/choice/recovery',
  },
  CARE_LOG: '/careLog/:chartId',
  CHOICE_LOG: {
    BODY: '/careLog/choice/body/:chartId',
    COGNITIVE: '/careLog/choice/cognitive/:chartId',
    NURSING: '/careLog/choice/nursing/:chartId',
    RECOVERY: '/careLog/choice/recovery/:chartId',
  },
  SIGNIFICANT_LOG: {
    BODY: '/careLog/significant/body/:chartId',
    COGNITIVE: '/careLog/significant/cognitive/:chartId',
    NURSING: '/careLog/significant/nursing/:chartId',
    RECOVERY: '/careLog/significant/recovery/:chartId',
  },
  OCR: '/ocr',
  OCR_LOADING: '/ocr/loading',
  OCR_CHECKING: '/ocr/check',
  MYPAGE: '/my',
  ADMIN: {
    ROOT: '/admin',
    CAREWORKER: '/admin/careWorker',
    GUARDIAN: '/admin/guardian',
    INSTITUTION: '/admin/institution',
    RECIPIENT: '/admin/recipient',
  },
  NOT_FOUND: '*',
}

export const getDynamicPath = {
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href
    return `${RouterPath.LOGIN}?redirect=${encodeURIComponent(currentRedirect)}`
  },
}

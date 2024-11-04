export const RouterPath = {
  ROOT: '/',
  HOME: '/',
  LOGIN: '/login',
  RECIPIENTS: '/recipients',
  CHART: '/chart',
  SHARE: '/share',
  CAMERA: '/camera',
  AUDIO_RECORD: '/chart/audioRecord',
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

  CARE_LOG: '/careLog',
  DETAIL_LOG: '/detailLog',
  MULTIPLE_LOG: '/multipleLog',
  SPEECH_TO_TEXT: '/speechToText',
  OCR: '/ocr',
  OCR_LOADING: '/ocr/loading',
  OCR_CHECKING: '/ocr/check',
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
  // theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href
    return `${RouterPath.LOGIN}?redirect=${encodeURIComponent(currentRedirect)}`
  },
}

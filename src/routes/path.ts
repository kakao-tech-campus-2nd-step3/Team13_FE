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
    PHYSICAL: '/chart/significant/physical',
    COGNITIVE: '/chart/significant/cognitive',
    HEALTH: '/chart/significant/health',
    RECOVERY: '/chart/significant/recovery',
  },
  CHOICE: {
    PHYSICAL: '/chart/choice/physical',
    COGNITIVE: '/chart/choice/cognitive',
    HEALTH: '/chart/choice/health',
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

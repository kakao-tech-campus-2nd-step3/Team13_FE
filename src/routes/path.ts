export const RouterPath = {
  ROOT: '/',
  HOME: '/',
  LOGIN: '/login',
  RECIPIENTS: '/recipients',
  CHART: '/chart',
  DIY: '/chart/DIY',
  SHARE: '/share',
  CAMERA: '/camera',
  AUDIO_RECORD: '/chart/audioRecord',
  MULTIPLE_CHOICE: '/multipleChoice',
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

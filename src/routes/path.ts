export const RouterPath = {
  root: '/',
  home: '/',
  login: '/login',
  recipients: '/recipients',
  DIY: '/chart/DIY',
  share: '/share',
  camera: '/camera',
  audioRecord: '/audioRecord',
  careLog: '/careLog',
  detailLog: '/detailLog',
  speechToText: '/speechToText',
  ocr: '/ocr',
  ocrChecking: '/ocr/check',
  notFound: '*',
}

export const getDynamicPath = {
  // theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`
  },
}

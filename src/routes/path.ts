export const RouterPath = {
  root: '/',
  home: '/',
  login: '/login',
  recipients: '/recipients',
  chart: '/chart',
  DIY: '/chart/DIY',
  camera: '/camera',
  audioRecord: '/audioRecord',
  careLog: '/careLog',
  speechToText: '/speechToText',
  ocr: '/ocr',
  notFound: '*',
}

export const getDynamicPath = {
  // theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`
  },
}

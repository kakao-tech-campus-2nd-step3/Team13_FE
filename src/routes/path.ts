export const RouterPath = {
  login: '/login',
  recipients: '/recipients',
  notFound: '*',
}

export const getDynamicPath = {
  // theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`
  },
}

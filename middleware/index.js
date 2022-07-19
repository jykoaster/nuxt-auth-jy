// middleware/index.js
import Middleware from '../../middleware'
Middleware.authCustom = (context) => {
  const { route, store, redirect, localeLocation } = context
  const options = JSON.parse(`<%= JSON.stringify(options) %>`)
  const { loginPath, i18n } = options
  const isUseAuth = route.matched.some((m) => {
    if (process.client) {
      // Client
      return Object.values(m.components).some(
        (component) =>
          component.options && component.options.authCustom === true
      )
    } else {
      // SSR
      return Object.values(m.components).some((component) =>
        Object.values(component._Ctor).some(
          (ctor) => ctor.options && ctor.options.authCustom === true
        )
      )
    }
  })
  if (isUseAuth) {
    const isLogin = store.state.auth.isLogin && store.state.auth.token
    if (!isLogin) {
      if (i18n) {
        redirect(localeLocation(loginPath))
      } else {
        redirect(localeLocation(loginPath))
      }
    }
  }
}

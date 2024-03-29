// middleware/index.js
import { routeOption } from '../util.ts'
import Middleware from '../../middleware'
Middleware.authCustom = (context) => {
  const { route, redirect, localeLocation, $authCustom } = context
  const options = JSON.parse(`<%= JSON.stringify(options) %>`)
  const { loginPath, guestPath, i18n } = options
  const isUseGuest = routeOption(route, 'guest')
  const isUseAuth = routeOption(route, true)
  const isLogin = $authCustom.isLogged()
  if (isUseAuth) {
    if (!isLogin) {
      if (i18n) {
        redirect(localeLocation(loginPath))
      } else {
        redirect(loginPath)
      }
    }
  }
  if (isUseGuest) {
    if (isLogin) {
      if (i18n) {
        redirect(localeLocation(guestPath))
      } else {
        redirect(guestPath)
      }
    }
  }
}

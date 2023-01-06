import { Plugin } from '@nuxt/types'
import { Storage } from './storage'

const options = JSON.parse(`<%= JSON.stringify(options) %>`)
const {
  registerUrl,
  loginUrl,
  refreshUrl,
  userUrl,
  editUrl,
  resetPassUrl,
  expires,
  tokenProperty,
  refreshTokenProperty,
  rememberProperty,
  userDataProperty,
  tokenType,
  oAuth,
  redirectUrl,
} = options
const myPlugin: Plugin = (ctx, inject) => {
  const storage = new Storage(ctx)
  const allFn = {
    async processToken(token: any) {
      const userToken = JSON.parse(
        Buffer.from(
          token.replace(/\/?/g, '').replace(/-/g, '+').replace('/_/g', '/'),
          'base64'
        ).toString()
      )
      try {
        if (userToken[tokenProperty]) {
          const expired = new Date().getTime() + expires * 1000
          storage.setUniversal('token', userToken[tokenProperty])
          storage.setUniversal('refreshToken', userToken[refreshTokenProperty])
          storage.setUniversal('expiredAt', expired)
          storage.setUniversal('tokenType', tokenType)

          ctx.app.$axios.setToken(storage.state.token, storage.state.tokenType)
          await this.fetchUserData()
          storage.setUniversal('isLogged', true)
        }
      } catch (error) {
        throw new Error(`[nuxt-auth-jy] ${error}`)
      }
    },
    addReciveMessageListener() {
      const reciveEvent = async (e: any) => {
        const data = e.data
        if (origin === window.location.origin && data.token) {
          await this.processToken(data.token)

          window.removeEventListener('message', reciveEvent, false)

          window.location.reload()
        }
      }
      window.addEventListener('message', reciveEvent, false)
    },

    register(data: any): Promise<Object | void> {
      if (!registerUrl) {
        throw new Error('[nuxt-auth-jy] Option "registerUrl" is not set!')
      }
      return new Promise((resolve, reject) => {
        ctx.$axios
          .$post(registerUrl, data)
          .then((response) => resolve(response))
          .catch((error) => {
            reject(error)
          })
      })
    },
    oAuthLogin(name: string): void {
      if (!oAuth) throw new Error('[nuxt-auth-jy] Option "oAuth" is not set!')
      const tar = oAuth.find((el: any) => el.name === name)
      if (!tar) throw new Error(`[nuxt-auth-jy] ${name} strategy is not set!`)
      this.addReciveMessageListener()
      window.location.href = `${tar.url}?redirect=${redirectUrl}?type=auto-close`
    },

    login(data: any, remember: Boolean = false): Promise<unknown> {
      if (!loginUrl) {
        throw new Error('[nuxt-auth-jy] Option "loginUrl" is not set!')
      }
      return new Promise((resolve, reject) => {
        ctx.app.$axios
          .$post(loginUrl, data)
          .then(async (response) => {
            if (response[tokenProperty]) {
              const expired = new Date().getTime() + expires * 1000
              storage.setUniversal('token', response[tokenProperty])
              storage.setUniversal(
                'refreshToken',
                response[refreshTokenProperty]
              )
              storage.setUniversal('expiredAt', expired)
              storage.setUniversal('tokenType', tokenType)

              ctx.app.$axios.setToken(
                storage.state.token,
                storage.state.tokenType
              )
              await this.fetchUserData()
              storage.setUniversal('isLogged', true)
              if (remember) {
                if (!rememberProperty) {
                  this.logout()
                  reject(
                    new Error(
                      '[nuxt-auth-jy] Option "rememberProperty" is not set!'
                    )
                  )
                }
                storage.setUniversal('remember', data[rememberProperty])
              } else {
                storage.removeUniversal('remember')
              }
              resolve({ success: true })
            } else {
              resolve(response)
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    editInfo(data: object): Promise<Object | void> {
      if (!editUrl) {
        throw new Error('[nuxt-auth-jy] Option "editUrl" is not set!')
      }
      return new Promise((resolve, reject) => {
        ctx.app.$axios
          .$put(editUrl, data)
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchUserData(): Promise<any> {
      if (!userUrl) {
        throw new Error('[nuxt-auth-jy] Option "userUrl" is not set!')
      }
      return new Promise((resolve, reject) => {
        ctx.app.$axios
          .$get(userUrl)
          .then((response) => {
            if (response[userDataProperty]) {
              storage.setUniversal('user', response[userDataProperty])
              resolve({ success: true })
            } else {
              this.logout()
              reject(
                new Error(
                  `[nuxt-auth-jy] Cannot find property "${userDataProperty}" in "fetchUserData()" response!`
                )
              )
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    logout(): Boolean | void {
      try {
        storage.removeUniversal('isLogged')
        storage.removeUniversal('tokenType')
        storage.removeUniversal('token')
        storage.removeUniversal('refreshToken')
        storage.removeUniversal('expiredAt')
        storage.removeUniversal('user')

        return true
      } catch (_) {
        console.error('Log out ERROR!')
      }
    },
    isLogged(): unknown {
      return storage.state.isLogged
    },
    getUserData(): unknown {
      return storage.state.user
    },
    getRemember(): unknown {
      return storage.state.remember
    },
    getToken(): Object {
      return { type: storage.state.tokenType, token: storage.state.token }
    },
    refreshToken(request: any) {
      if (!refreshUrl) {
        throw new Error('[nuxt-auth-jy] Option "refreshUrl" is not set!')
      }
      return new Promise((resolve, reject) => {
        const refreshToken = storage.getUniversal('refreshToken')
        ctx.app.$axios
          .$post(refreshUrl, { refresh_token: refreshToken })
          .then((response) => {
            if (response) {
              const expired = new Date().getTime() + expires * 1000
              storage.setUniversal('token', response[tokenProperty])
              storage.setUniversal(
                'refreshToken',
                response[refreshTokenProperty]
              )
              storage.setUniversal('expiredAt', expired)
              storage.setUniversal('tokenType', tokenType)

              resolve(ctx.app.$axios.request(request))
            } else {
              resolve(response)
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    resetPass(data: any) {
      if (!resetPassUrl) {
        throw new Error('[nuxt-auth-jy] Option "resetPassUrl" is not set!')
      }
      return new Promise((resolve, reject) => {
        ctx.app.$axios
          .$put(resetPassUrl, data)
          .then((response) => {
            if (response) {
              resolve(response)
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  }
  inject('authCustom', allFn)
}

export default myPlugin

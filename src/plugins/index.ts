import { Plugin } from '@nuxt/types'
import { Storage } from './storage'

const options = JSON.parse(`<%= JSON.stringify(options) %>`)
const {
  registerUrl,
  loginUrl,
  refreshUrl,
  userUrl,
  editUrl,
  expires,
  tokenProperty,
  refreshTokenProperty,
  tokenType,
} = options
const myPlugin: Plugin = (ctx, inject) => {
  const storage = new Storage(ctx)
  const allFn = {
    register(data: any): Promise<Object | void> {
      return new Promise((resolve, reject) => {
        ctx.$axios
          .$post(registerUrl, data)
          .then((response) => resolve(response))
          .catch((error) => {
            reject(error)
          })
      })
    },
    login({ username, password }: any): Promise<unknown> {
      return new Promise((resolve, reject) => {
        ctx.app.$axios
          .$post(loginUrl, { username, password })
          .then((response) => {
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
              this.refreshToken()
              resolve(this.fetchUserData())
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
    fetchUserData(): Promise<unknown> {
      return new Promise((resolve, reject) => {
        ctx.app.$axios
          .$get(userUrl)
          .then((response) => {
            if (response) {
              storage.setUniversal('user', response)
              storage.setUniversal('isLogged', true)
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
    getToken() {
      return { type: storage.state.tokenType, token: storage.state.token }
    },
    refreshToken() {
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
  }
  inject('authCustom', allFn)
}

export default myPlugin

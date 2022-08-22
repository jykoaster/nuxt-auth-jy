import { Plugin } from '@nuxt/types'
import { Storage } from './storage'

const options = JSON.parse(`<%= JSON.stringify(options) %>`)
const { registerUrl, loginUrl, userUrl, expires } = options
const myPlugin: Plugin = (ctx, inject) => {
  const storage = new Storage(ctx)
  const allFn = {
    register(data: any) {
      return new Promise((resolve) => {
        ctx.$axios
          .$post(registerUrl, data)
          .then((response) => resolve(response))
      })
    },
    async login({ username, password }: any): Promise<Object | void> {
      const res = await ctx.$axios
        .$post(loginUrl, { username, password })
        .then((response) => {
          return response
        })
        .catch((_) => {
          this.logout()
        })
      const { access_token, refresh_token, token_type } = res
      if (access_token) {
        const expired = new Date().getTime() + expires * 1000
        storage.setUniversal('token', access_token)
        storage.setUniversal('refreshToken', refresh_token)
        storage.setUniversal('expiredAt', expired)
        storage.setUniversal('tokenType', token_type)

        ctx.$axios.setToken(storage.state.token, storage.state.tokenType)
        const userData = await ctx.$axios
          .$get(userUrl)
          .then((response) => {
            return response
          })
          .catch((_) => {
            this.logout()
          })
        if (userData) {
          storage.setUniversal('user', userData)
          storage.setUniversal('isLogged', true)
          return { success: true }
        } else {
          this.logout()
          return userData
        }
      } else {
        this.logout()
        return res
      }
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
  }
  inject('authCustom', allFn)
}

export default myPlugin

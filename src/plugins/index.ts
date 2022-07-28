import { Plugin } from '@nuxt/types'
import axios from 'axios'
import { Storage } from './storage'

// const options = JSON.parse(`<%= JSON.stringify(options) %>`)
// interface loginData {
//   acc?: String
//   pass?: String
// }

const myPlugin: Plugin = (ctx, inject) => {
  const storage = new Storage(ctx)
  const allFn = {
    async login(): Promise<Boolean | void> {
      try {
        const token = await axios.get('http://icanhazip.com/')
        const userData = {
          id: '0',
          name: 'User',
        }
        storage.setUniversal('token', token.data)
        storage.setUniversal('user', userData)
        storage.setUniversal('isLogged', true)

        return true
      } catch (_) {
        console.error('Log in ERROR!')
      }
    },
    logout(): Boolean | void {
      try {
        storage.removeUniversal('isLogged')
        storage.removeUniversal('token')
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
      // try {
      return storage.state.user
      // } catch (_) {
      // console.error('Get user data FAILED!')
      // }
    },
  }
  inject('authCustom', allFn)
}

export default myPlugin

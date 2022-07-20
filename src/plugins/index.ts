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
        storage.setUniversal('isLogged', true)
        storage.setUniversal('token', token)
        return true
      } catch (_) {
        console.error('Log in ERROR!')
      }
    },
    logout(): Boolean | void {
      try {
        storage.removeUniversal('isLogged')
        storage.removeUniversal('token')
        return true
      } catch (_) {
        console.error('Log out ERROR!')
      }
    },
    isLogged(): unknown {
      try {
        return storage.getUniversal('isLogged')
      } catch (_) {
        console.error('Get log status FAILED!')
      }
    },
  }
  inject('authCustom', allFn)
}

export default myPlugin
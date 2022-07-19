import { Plugin } from '@nuxt/types'

export interface VueComponent {
  options: any
  _Ctor: VueComponent
}
export type MatchedRoute = { components: VueComponent[] }

export type Route = { matched: MatchedRoute[] }

// const options = JSON.parse(`<%= JSON.stringify(options) %>`)

const myPlugin: Plugin = ({ store }, inject) => {
  const allFn = {
    login() {
      const token = '21354' // from api
      store.dispatch('authCustom/login', token)
    },
  }
  inject('authCustom', allFn)
}

export default myPlugin

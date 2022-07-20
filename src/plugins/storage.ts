import type { Context } from '@nuxt/types'
import cookie from 'cookie'
const options = JSON.parse(`<%= JSON.stringify(options) %>`)
export class Storage {
  public ctx: Context
  public prefix: String

  constructor(ctx: Context) {
    this.ctx = ctx
    this.prefix = options.prefix
  }

  setUniversal<V extends unknown>(key: string, value: V): V | void {
    this.setCookie(key, value)
  }

  getUniversal(key: string): unknown {
    if (process.server && !this.ctx.req) {
      return
    }

    const cookieStr = process.client
      ? document.cookie
      : this.ctx.req.headers.cookie

    const cookies = cookie.parse(cookieStr || '') || {}
    const _key = this.prefix + key
    const value = cookies[_key]
      ? decodeURIComponent(cookies[_key] as string)
      : undefined

    if (typeof value === 'string') {
      try {
        return JSON.parse(value)
      } catch (_) {}
    }
    return value
  }

  removeUniversal(key: string): void {
    this.setCookie(key, undefined)
  }

  setCookie<V extends unknown>(key: string, value: V): V {
    const _key = this.prefix + key
    let _value
    if (typeof value === 'string') {
      _value = value
    }
    _value = JSON.stringify(value)
    const serializedCookie = cookie.serialize(_key, _value)
    if (process.client) {
      // Set in browser
      document.cookie = serializedCookie
    } else if (process.server && this.ctx.res) {
      // Send Set-Cookie header from server side
      let cookies = (this.ctx.res.getHeader('Set-Cookie') as string[]) || []
      if (!Array.isArray(cookies)) cookies = [cookies]
      cookies.unshift(serializedCookie)
      this.ctx.res.setHeader(
        'Set-Cookie',
        cookies.filter(
          (v, i, arr) =>
            arr.findIndex((val) =>
              val.startsWith(v.substr(0, v.indexOf('=')))
            ) === i
        )
      )
    }
    return value
  }
}

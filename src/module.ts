import { Module } from '@nuxt/types'
interface loginsStrategy {
  name: string
  url: string
}
interface Options {
  tokenProperty: String
  tokenType: String
  refreshTokenProperty?: String
  rememberProperty?: String
  loginPath?: String
  guestPath?: String
  prefix?: String
  i18n?: Boolean
  expires?: Number
  loginUrl?: String
  refreshUrl?: String
  resetPassUrl?: String
  registerUrl?: String
  userUrl?: String
  userDataProperty?: String
  editUrl?: String
  oAuth?: Array<loginsStrategy>
  redirectUrl?: String
}

const myModule: Module<Options> = function (moduleOptions) {
  const { resolve, join } = require('path')

  // const { readdirSync } = require('fs')
  const options = {
    ...moduleOptions,
    ...this.options.authCustom,
  }
  if (!options.tokenProperty)
    throw new Error(`[nuxt-auth-jy] Option "tokenProperty" doesn't set`)
  if (!options.tokenType)
    throw new Error(`[nuxt-auth-jy] Option "tokenType" doesn't set`)
  if (!options.loginPath) options.loginPath = '/'
  if (!options.guestPath) options.guestPath = '/'
  if (!options.userDataProperty) options.userDataProperty = 'data'
  if (!options.prefix) options.prefix = 'authCustom_'
  if (!options.i18n) options.i18n = false
  if (!options.expires) options.expires = 3600

  const pluginsToSync = [
    'plugins/index.ts',
    'plugins/storage.ts',
    'middleware/index.js',
    'util.ts',
  ]
  for (const pathString of pluginsToSync) {
    this.addPlugin({
      src: resolve(__dirname, pathString),
      fileName: join('authCustom', pathString),
      options,
    })
  }

  // const foldersToSync = []
  // for (const pathString of foldersToSync) {
  //   const path = resolve(__dirname, pathString)
  //   for (const file of readdirSync(path)) {
  //     this.addTemplate({
  //       src: resolve(path, file),
  //       fileName: join('authCustom', pathString, file),
  //       options,
  //     })
  //   }
  // }
}

export default myModule
module.exports.meta = require('../package.json')

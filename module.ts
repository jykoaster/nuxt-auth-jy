import { Module } from '@nuxt/types'

interface Options {
  loginPath?: String
  i18n?: Boolean
}

const myModule: Module<Options> = function (moduleOptions) {
  const { resolve, join } = require('path')
  const { readdirSync } = require('fs')
  const options = {
    ...moduleOptions,
    ...this.options.authCustom,
  }
  if (!options.loginPath) options.loginPath = '/'
  if (!options.i18n) options.i18n = false

  const pluginsToSync = ['store/index.js', 'plugin.ts', 'middleware/index.js']
  for (const pathString of pluginsToSync) {
    this.addPlugin({
      src: resolve(__dirname, pathString),
      fileName: join('authCustom', pathString),
      options,
    })
  }

  const foldersToSync = ['store/modules']
  for (const pathString of foldersToSync) {
    const path = resolve(__dirname, pathString)
    for (const file of readdirSync(path)) {
      this.addTemplate({
        src: resolve(path, file),
        fileName: join('authCustom', pathString, file),
        options,
      })
    }
  }
}

export default myModule

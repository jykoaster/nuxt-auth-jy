import 'vue'
import '@nuxt/types'
declare module 'vue/types/options' {
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  interface ComponentOptions<V> {
    authCustom?: true | false | 'guest'
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $authCustom: any
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $authCustom: any
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  interface Store<S> {
    $authCustom: any
  }
}

# Get Started

Set module in `nuxt.config.js`

```
 modules: [
      '@nuxtjs/axios',
      ['~/modules/authCustom', { options... }],
    ],

router: {
      middleware: ['authCustom'],
    },

```

or

```
 modules: [
      '@nuxtjs/axios',
      '@neneos/nuxt-animate.css',
      'vue-scrollto/nuxt',
      '@nuxtjs/i18n',
      '@nuxtjs/recaptcha',
      '@nuxtjs/robots',
      '@nuxtjs/sitemap',
      '@nuxt/image',
      '~/modules/authCustom' ,
    ],
authCustom:{
    options...
    }
router: {
      middleware: ['authCustom'],
    },
```

# Options

## `loginPath`

- Type:`String`
- Default:`/`
- Description: Login path in your project

## `i18n`

- Type:`Boolean`
- Default:`false`
- Description: If you are using `@nuxtjs/i18n` set this option with `true`

# Get Started

Set module in `nuxt.config.js`

```
 modules: [
      '@nuxtjs/axios',
      ['nuxt-auth-jy', { options... }],
    ],

router: {
      middleware: ['authCustom'],
    },

```

or

```
 modules: [
      'nuxt-auth-jy' ,
    ],
authCustom:{
    options...
    }
router: {
      middleware: ['authCustom'],
    },
```

# Usage

Yout can set `authCustom` mode in page with `true` or `guest`(default value is `false`)

ex:

```
authCustom: true,
data: () => ({
  ...
}),
```

When mode is `true`, it only allow logged user to visit.When mode is `guest`, it only allow unlogged user to visit.Default value is `false`,it means everyone was allowed to visit.

# API reference

When you use with this package, it will auto inject `$authCustom` in your context

## `login(data:Object)`

- Return:`Void`
- Description Call function to login with data

## `isLogged()`

- Return:`Boolean`
- Description:It will return login status

## `logout()`

- Return:`Void`
- Description:It will return login status

# Options

## `loginPath`

- Type:`String`
- Default:`/`
- Description: The path which will redirect when login status is `false` and `authCustom` has been set with `true`

## `guestPath`

- Type:`String`
- Default:`/`
- Description: The path which will redirect when login status is `true` and `authCustom` has been set with `guest`

## `i18n`

- Type:`Boolean`
- Default:`false`
- Description: If you are using `@nuxtjs/i18n` set this option with `true`

## `prefix`

- Type:`String`
- Default:`authCustom_`
- Description: Prefix for cookies

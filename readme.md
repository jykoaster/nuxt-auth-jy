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

## `register(data:Object)`

- Return:`Promise`
- Description:Call `registerUrl` with `data` parameter as payload

## `login(data:Object)`

- Return:`Promise`
- Description:Call `registerUrl` to login with `data` parameter as payload,then auto fetch userdata with `userUrl`

## `isLogged()`

- Return:`Boolean`
- Description:It will return login status

## `logout()`

- Return:`Void`
- Description:Logout function

## `fetchUserData()`

- Return:`Promise`
- Description:Fetch userdata with `userUrl`

## `editInfo(data:Object)`

- Return:`Promise`
- Description:Edit userdata with `editUrl`

# Options

## `tokenProperty`

- Type:`String`
- Required:`true`
- Description: The token property name from api response

## `tokenType`

- Type:`String`
- Required:`true`
- Description: Type of token (ex:'bearer')

## `refreshTokenProperty`

- Type:`String`
- Default:`null`
- Description: The refresh token property name from api response

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

## `expires`(second)

- Type:`Number`
- Default:`3600`
- Description: Cookie expired time

## `registerUrl`

- Type:`String`
- Default:`null`
- Description:Register url

## `loginUrl`

- Type:`String`
- Default:`null`
- Description:Login url

## `userUrl`

- Type:`String`
- Default:`null`
- Description:Fetch userdata url

## `editUrl`

- Type:`String`
- Default:`null`
- Description:Edit userdata url

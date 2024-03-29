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

## With Typescript

```
// tsconfig.json

types:[
  "nuxt-cart-jy"
]


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

## `login(data:Object,remember:Boolean)`

- Return:`Promise`
- Description:Call `loginUrl` to login with `data` parameter as payload,then auto fetch userdata with `userUrl`.If `remember` is `true`,the value of key that you set in option `rememberProperty` will be saved from `data` parameter

## `oAuthLogin(name:String)`

- Return:`Promise`
- Decription: Login by thirdParty which set in option `oAuth` first then redirect to `redirectUrl`

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

## `getToken()`

- Return:`{token:String,type:String}`
- Description:Get current token and type

## `refreshToken()`

- Return:`Promise`
- Description:If you set `refreshUrl` and `refreshTokenProperty`, you can refresh token by this function

## `resetPass()`

- Return:`Promise`
- Description:Reset password with `resetPassUrl`

# Options

## `tokenProperty`

- Type:`String`
- Required:`true`
- Description: The token property name in `login()` response

## `tokenType`

- Type:`String`
- Required:`true`
- Description: Type of token (ex:'bearer')

## `refreshTokenProperty`

- Type:`String`
- Default:`null`
- Description: The refresh token property name in `login()` response

## `rememberProperty`

- Type:`String`
- Default:`null`
- Description: The account property which will be saved in `login()` function first parameter

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

## `refreshUrl`

- Type:`String`
- Default:`null`
- Description:Refresh token url

## `userUrl`

- Type:`String`
- Default:`null`
- Description:Fetch userdata url

## `userDataProperty`

- Type:`String`
- Default:`data`
- Description:The property which will been saved as userdata from `fetchUserData()` response

## `editUrl`

- Type:`String`
- Default:`null`
- Description:Edit userdata url

## `resetPassUrl`

- Type:`String`
- Default:`null`
- Description:Reset password url

## `oAuth`

- Type:`Array<loginsStrategy>`
- Default:`null`
- Description:oAuth login config

`loginStrategy`:

```
{
  name: required<string>
  url: required<string>
}
```

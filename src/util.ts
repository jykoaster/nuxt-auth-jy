export interface VueComponent {
  options: any
  _Ctor: VueComponent
}
export type MatchedRoute = { components: VueComponent[] }
export type Route = { matched: MatchedRoute[] }
export const routeOption = (route: Route, value: string | Boolean) => {
  return route.matched.some((m) => {
    if (process.client) {
      // Client
      return Object.values(m.components).some(
        (component) =>
          component.options && component.options.authCustom === value
      )
    } else {
      // SSR
      return Object.values(m.components).some((component) =>
        Object.values(component._Ctor).some(
          (ctor) => ctor.options && ctor.options.authCustom === value
        )
      )
    }
  })
}
export const isUnset = (o: unknown): boolean =>
  typeof o === 'undefined' || o === null

import { mountUri } from '@/utils'

export default {
  install (Vue, options) {
    Object.defineProperties(Vue.prototype, {
      $mountUri: {
        get: () => url => mountUri(url)
      }
    })
  }
}

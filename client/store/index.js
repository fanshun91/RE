import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

export default () => {
  const store = new Vuex.Store({
    state: defaultState,
    getters,
    mutations,
    actions
    // modules: {
    //   a: {
    //     namespaced: true,
    //     state: {},
    //     mutations: {},
    //     getters: {},
    //     actions: {}
    //   }
    // }
  })

  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const HRState = require('./state/state').default
      const HRMutations = require('./mutations/mutations').default
      const HRActions = require('./actions/actions').default
      const HRGetters = require('./getters/getters').default

      // 开启热更替功能
      store.hotUpdate({
        state: HRState,
        mutations: HRMutations,
        actions: HRActions,
        getters: HRGetters
      })
    })
  }

  return store
}

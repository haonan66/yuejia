import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {}

const mutations = {
    CHANGE_STATE(state){
        state.isCollapse = !state.isCollapse
    }
}

const state = {
    isCollapse: false
}

export default new Vuex.Store({
    actions,
    mutations,
    state
})
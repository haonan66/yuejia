import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {}

const mutations = {
    CHANGE_STATE(state){
        state.isCollapse = !state.isCollapse
    },
    SELECT_MENU(state,value){
        if (value.name === 'home'){
            state.currentMenu = null
        } else{
            state.currentMenu = value
            // 新增 tabsList
            let result = state.tabsList.findIndex(item => item.name === value.name)
            result === -1 ? state.tabsList.push(value) : ''

        }
    },
    CLOSE_TAG(state,value){
        let result = state.tabsList.findIndex(item => item.name === value.name)
        state.tabsList.splice(result,1)
        // state.currentMenu = value
    }
}

const state = {
    isCollapse: false,
    tabsList:[
        {
            path: '/',
            name: 'home',
            label: '首页',
            icon: 'home'
        }
    ],
    currentMenu: null
}

export default new Vuex.Store({
    actions,
    mutations,
    state
})
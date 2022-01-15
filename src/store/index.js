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
    },
    UPDATE_ADMIN(state,value){
        //  更新 admin 信息
        state.admin = value
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
    currentMenu: null,
    //  登录后的管理员信息
    admin: {}
}

export default new Vuex.Store({
    actions,
    mutations,
    state
})
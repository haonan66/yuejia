import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../pages/Main'
import List from '../pages/User/List'
import Add from '../pages/User/Add'

Vue.use(VueRouter)

//  消除重复点击路由产生的错误警告
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this,location).catch(err => err)
}

export default new VueRouter({
    routes: [
        {
            name: 'main',
            path: '/',
            component: Main,
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: () => import('../pages/Home/Home')
                },
                {
                    path: 'article',
                    name: 'article',
                    component: () => import('../pages/Article/Article')
                },
                {          
                    name: 'user',
                    path: 'user',
                    children: [
                        {
                            name: 'list',
                            path: 'list',
                            component: List
                        },
                        {
                            name: 'add',
                            path: 'add',
                            component: Add
                        }
                    ]
                }
            ]
        }
    ]
})
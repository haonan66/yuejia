import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../pages/Main'
import List from '../pages/User/List'
import Add from '../pages/User/Add'
import Home from '../pages/Home/Home'
import Article from '../pages/Article/Article'
import Login from '../pages/Login/Login'
import PersonalCenter from '../pages/Admin/PersonalCenter'
import TeamList from '../pages/Team/TeamList'
import Identity from '../pages/User/Identity'

// import Login from '../pages/Login/Login'

Vue.use(VueRouter)

//  消除重复点击路由产生的错误警告
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this,location).catch(err => err)
}

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            component: Login
        },
        {
            name: 'main',
            path: '/main',
            component: Main,
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: Home
                },
                {
                    path: '/article',
                    name: 'article',
                    component: Article
                },
                {
                    name: 'list',
                    path: '/user/list',
                    component: List,
                },
                {
                    name: 'add',
                    path: '/user/add',
                    component: Add,
                },
                {
                    name: 'edit',
                    path: '/user/edit/:id',
                    component: Add,
                    hidden: true
                },
                {
                    name: 'personalCenter',
                    path: '/admin/personalCenter',
                    component: PersonalCenter,
                    hidden: true
                },
                {
                    name: 'teamList',
                    path: '/team/list',
                    component: TeamList,
                },
                {
                    name: 'identity',
                    path: '/user/identity',
                    component: Identity,
                },
            ]
        }
    ]
})

//  挂载路由导航守卫
router.beforeEach((to,from,next)=>{
    const token = sessionStorage.getItem('token')

    if(to.path === '/login') {
        sessionStorage.removeItem('token')
        next()
    }
    if(!token) {
        sessionStorage.removeItem('token')
        return next('/login')
    }
    next()
})

export default router
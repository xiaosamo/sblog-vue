import Vue from 'vue'
import Router from 'vue-router'
/* Router Modules */

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 根目录
      path: '/',
      // redirect: '/index'
      name: 'home',
      component: () => import('@/components/index')
      // component: index
    },
    {
      // 根目录
      path: '/test',
      // redirect: '/index'
      name: 'test',
      component: () => import('@/components/test')
      // component: index
    },
    {
      // 登入
      path: '/login',
      name: 'login',
      component: () => import('@/components/login')
      // component: login
    },
    {
      // 注册
      path: '/register',
      name: 'register',
      component: () => import('@/components/register')
    },
    {
      // 写博客
      path: '/write',
      name: 'write',
      component: () => import('@/components/blog/write')
    },
    {
      // 更新博客
      path: '/editor/:id',
      name: 'updateBlog',
      component: () => import('@/components/blog/update')
    },
    {
      // 用户主页
      path: '/user/:id',
      name: 'userHome',
      component: () => import('@/components/user/userHome')
    },
    {
      // 首页
      path: '/index',
      name: 'index',
      component: () => import('@/components/index')
      // alias: '/' // 别名意味着，当用户访问 /index 时，URL 会保持为 /，但是路由匹配则为 /index，就像用户访问 / 一样。
    },
    {
      // 分类
      path: '/category/:id',
      name: 'category',
      component: () => import('@/components/index')
    },
    {
      // 订阅的文章
      path: '/subscribe',
      name: 'subscribe',
      component: () => import('@/components/index')
      // alias: '/' // 别名意味着，当用户访问 /index 时，URL 会保持为 /，但是路由匹配则为 /index，就像用户访问 / 一样。
    },
    {
      // 文章详情
      path: '/article/:id',
      name: 'article',
      component: () => import('@/components/article/article')
    },
    {
      // 搜索
      path: '/search',
      name: 'search',
      // params: true,
      component: () => import('@/components/article/search')
    },
    {
      // 用户设置
      path: '/user/settings',
      name: 'userSetting',
      component: () => import('@/components/user/userSetting')
    },
    {
      // 用户消息
      path: '/message',
      name: 'userMessage',
      component: () => import('@/components/user/userMessage')
    },
    {
      // 消息界面
      path: '/chat/:id',
      name: 'chat',
      component: () => import('@/components/message/chat')
    },
    {
      // 404
      path: '*',
      component: () => import('@/views/errorPage/404'),
      // redirect: '/404',
      hidden: true
    }
  ],
  base: '/',
  mode: 'history' // 去掉链接的#号
})

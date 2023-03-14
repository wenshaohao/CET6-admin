import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies';
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // {
  //   path: '/form',
  //   component: () => import('@/views/form/index'),
  //   hidden: true
  // },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '数据统计',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '数据统计', icon: 'dashboard' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    children: [{
      path: 'user',
      name: 'User',
      component: () => import('@/views/user/user_list'),
      meta: { title: '用户管理', icon: 'dashboard' }
    },
    {
      path:'user_form',
      name:'User_form',
      component: () => import('@/views/form/user_form'),
      meta: { title: '用户修改', icon: 'dashboard' },
      hidden:true
    }]
  },
  {
    path: '/announcement',
    component: Layout,
    redirect: '/announcement',
    children: [{
      path: 'announcement',
      name: 'Announcement',
      component: () => import('@/views/announcement/announcement_list'),
      meta: { title: '公告管理', icon: 'dashboard' }
    },
    {
      path:'announcement_form',
      name:'announcement_form',
      component: () => import('@/views/form/announcement_form'),
      meta: { title: '公告修改', icon: 'dashboard' },
      hidden:true
    }]
  },
  // {
  //   path: '/announcement',
  //   component: Layout,
  //   redirect: '/announcement',
  //   hidden:true,
  //   children: [{
  //     path: 'announcement',
  //     name: 'Announcement',
  //     component: () => import('@/views/announcement/announcement_list'),
  //     meta: { title: '公告管理', icon: 'dashboard' }
  //   }]
  // },


  {
    path: '/essay',
    component: Layout,
    redirect: '/essay',
    children: [{
      path: 'essay',
      name: 'Essay',
      component: () => import('@/views/essay/essay_list'),
      meta: { title: '读本管理', icon: 'dashboard' },
    },
    {
      path: 'essay_form',
      name: 'Essay_form',
      component: () => import('@/views/form/essay_form'),
      meta: { title: '读本修改', icon: 'dashboard' },
      hidden:true

    }
    ]
  },
  {
    path: '/word',
    component: Layout,
    redirect: '/word',
    children: [{
      path: 'word',
      name: 'Word',
      component: () => import('@/views/word/word_list'),
      meta: { title: '单词管理', icon: 'dashboard' },
    },
    {
      path: 'word_form',
      name: 'Word_form',
      component: () => import('@/views/form/word_form'),
      meta: { title: '单词修改', icon: 'dashboard' },
      hidden:true

    }
    ]
  },

  {
    path: '/examination',
    component: Layout,
    redirect: '/examination',
    children: [{
      path: 'examination',
      name: 'Examination',
      component: () => import('@/views/examination/examination_list'),
      meta: { title: '真题管理', icon: 'dashboard' },

    },
    {
      path: 'examination_form',
      name: 'Examination_form',
      component: () => import('@/views/form/examination_form'),
      meta: { title: '真题修改', icon: 'dashboard' },
      hidden:true
    }]
  },

  {
    path: '/special_exercises',
    component: Layout,
    redirect: '/special_exercises/reading',
    name: 'Special_exercises',
    meta: { title: '专项练习', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'reading',
        name: 'Reading',
        component: () => import('@/views/special_exercises/reading/reading_list'),
        meta: { title: '阅读理解', icon: 'table' },

      },
      {
        path: 'reading_form',
        name: 'Reading_form',
        component: () => import('@/views/form/reading_form'),
        meta: { title: '阅读理解', icon: 'table' },
        hidden:true

      },
      {
        path: 'writing',
        name: 'Writing',
        component: () => import('@/views/special_exercises/writing/writing_list'),
        meta: { title: '写作练习', icon: 'table' }
      },
      {
        path: 'writing_form',
        name: 'writing_form',
        component: () => import('@/views/form/writing_form'),
        meta: { title: '写作练习', icon: 'table' },
        hidden:true

      },
      {
        path: 'cloze',
        name: 'Cloze',
        component: () => import('@/views/special_exercises/cloze/cloze_list'),
        meta: { title: '选词填空', icon: 'table' }
      },
      {
        path: 'cloze_form',
        name: 'cloze_form',
        component: () => import('@/views/form/cloze_form'),
        meta: { title: '选词填空', icon: 'table' },
        hidden:true

      },
      {
        path: 'matching',
        name: 'Matching',
        component: () => import('@/views/special_exercises/matching/matching_list'),
        meta: { title: '段落匹配', icon: 'table' }
      },
      {
        path: 'matching_form',
        name: 'matching_form',
        component: () => import('@/views/form/matching_form'),
        meta: { title: '段落匹配', icon: 'table' },
        hidden:true

      },
      {
        path: 'translation',
        name: 'Translation',
        component: () => import('@/views/special_exercises/translation/translation_list'),
        meta: { title: '段落翻译', icon: 'table' }
      },      {
        path: 'translation_form',
        name: 'translation_form',
        component: () => import('@/views/form/translation_form'),
        meta: { title: '段落翻译', icon: 'table' },
        hidden:true

      }
    ]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: '456', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },





  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}


//路由守卫
router.beforeEach((to,from,next)=>{
  // if(to.matched.length===0){
  //   next('/404')
  // }
  if(VueCookies.get("admin")){
	if(to.path=="/login"){
		next('/')
	}
    next()
  }else{
    if(to.path==='/login'){
      next()
    }else {
      next('/login')
    }
  }
})

export default router

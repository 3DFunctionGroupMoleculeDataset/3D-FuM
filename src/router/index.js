// src/router/index.js

import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const router = createRouter({

    
    history: createWebHashHistory(),  // hash 模式
    base:'vue3_page_test',
    // history: createWebHistory(),  // history 模式
    routes: [
        {
            path: '/',
            name: 'index',
            component: defineAsyncComponent(() => import(`../components/HelloWorld.vue`)),

        },
        // {
        //     // 404pages
        //     path: '/:catchAll(.*)',
            
        //     component: defineAsyncComponent(() => import(`../components/HelloWorld.vue`)),

        // },
        {
            path: '/hello1',
            name: 'hello1',
            component: defineAsyncComponent(() => import(`../components/HelloWorld_1.vue`)),

        },
        {
            path: '/test',
            name: 'test',
            component: defineAsyncComponent(() => import(`../components/test.vue`)),

        },
        {
            path: '/Home',
            name: 'home',
            component: defineAsyncComponent(() => import(`../components/Home.vue`)),

        },
        {
            path: '/Dataset',
            name: 'Dataset',
            component: defineAsyncComponent(() => import(`../components/Dataset.vue`)),

        }, {
            path: '/Generation',
            name: 'Generation',
            component: defineAsyncComponent(() => import(`../components/Generation.vue`)),

        }, {
            path: '/Leaderboard',
            name: 'Leaderboard',
            component: defineAsyncComponent(() => import(`../components/Leaderboard.vue`)),

        },


    ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
    // console.log(to, from)
    if (to.meta.title) {
        document.title = `${to.meta.title}`;
    }
    next()
})

router.afterEach((to, from) => {
    // console.log(to, from)
    console.log('afterEach')
})

export default router
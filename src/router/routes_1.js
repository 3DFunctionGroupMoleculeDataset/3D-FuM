const routes =[
    {
        path:'/',
        name:'index',
        title:'首页',
        component :() =>import('@/components/HelloWorld.vue'),
    },
    {
        path:'/test',
        name:'test',
        title:'test',
        component:() =>import('@/components/test.vue'),
    },
    {
        path:'/hello1',
        name:'hello1',
        title:'hello1',
        component :() =>import('@/components/HelloWorld_1.vue'),
    }
]

export default routes
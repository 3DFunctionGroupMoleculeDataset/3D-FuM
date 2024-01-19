import { createApp } from 'vue'
import App from './App.vue'

import router from './router';
// import './plugins/element-plus'
// import './index.css'
// import router from './router/index';
import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/dist/index.css';

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app=createApp(App)

app.use(router)
app.use(ElementPlus)
app.mount('#app')

for (const [key,component] of Object.entries(ElementPlusIconsVue)){
    app.component(key,component)
}

// createApp(App).mount('#app')

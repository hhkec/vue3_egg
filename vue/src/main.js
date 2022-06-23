import { createApp } from 'vue'
import { createPinia } from 'pinia' //导入pinia
import router from "./router.js"
import store from "./vuex.js"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia();        //调用创建pinia

app.use(router)
app.use(ElementPlus)
app.use(store)
app.use(pinia)

app.mount('#app')

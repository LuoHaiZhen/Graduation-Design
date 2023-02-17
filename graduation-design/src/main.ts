import { createApp } from 'vue'
import {createPinia} from 'pinia'
import pinia from './store/index'
import App from './App.vue'
import router from './router'
import "@/mock/mockServe";
//引入swiper样式

createApp(App).use(pinia).use(router).mount('#app')

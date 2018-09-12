/*
* 对于第三方包:
* 1. 把包引入到index.html
* 2. 再配置文件中配置当加载第三方包的时候不要打包.
* 3. 当你再模块中使用第三方包还得import引入使用
* */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
Vue.use(VueRouter)
import './lib/mui/css/mui.css'

import {Header} from 'mint-ui'
Vue.component(Header.name, Header)

new Vue({
    components: {App},
    //显示组件 template / render 2选1
    template: '<App />',
    // render c => c(App),
    router
}).$mount('#app')

import Vue from 'vue'
import 'font-awesome/css/font-awesome.css'
// import './assets/css/hd_main.css'
// import './assets/css/login.css'
import './assets/css/fonts.css'
import './assets/js/dateUtil'
import './assets/js/setTabUtil'
import jquery from 'jquery';
import vueUploads from "vue-uploads";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import JsonExcel from 'vue-json-excel'
import axios from 'axios'

import App from './App.vue'
import store from './store'
import router from './router'
import request from './request'
import config from "./config"
import stringUtils from "@/stringUtils";

Vue.use(ElementUI);
Vue.component('downloadExcel', JsonExcel)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.request = request
Vue.prototype.config = config
Vue.prototype.jquery = jquery
Vue.prototype.stringUtils = stringUtils

new Vue({
    store,
    router,
    vueUploads,
    render: h => h(App),
}).$mount('#app')

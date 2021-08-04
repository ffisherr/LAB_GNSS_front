import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import HomeComponent from "@/components/HomeComponent";
import GnssComponent from "@/components/GnssComponent";
import ContactsComponent from "@/components/ContactsComponent";

Vue.config.productionTip = false

Vue.use(IconsPlugin)
Vue.use(BootstrapVue)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'home', component: HomeComponent },
    { path: '/gnss', name: 'gnss', component: GnssComponent },
    { path: '/contacts', name: 'contacts', component: ContactsComponent }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

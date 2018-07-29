import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login.vue'
import Main from '../components/Main.vue'
import Content from '../components/sub/Content.vue'
import reportList from '../components/sub/reportList.vue'
import Delet from '../components/sub/Delet.vue'

const routes = [{
    path: "/",
    component: Login
}, {
    path: "/Main",
    component: Main,
    children: [{
        path: '/Main/Content',
        component: Content
    }, {
        path: '/Main/reportList',
        component: reportList
    }, {
        path: '/Main/Delet',
        component: Delet
    }]
}]

Vue.use(VueRouter);

export default new VueRouter({
    routes
})
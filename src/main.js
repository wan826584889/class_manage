import Vue from 'vue'
import App from './components/App.vue'
import ElementUI from 'element-ui';

import router from './router/index'

Vue.use(ElementUI);

new Vue({
    router,
    el: '#app',
    render: h => h(App)
})
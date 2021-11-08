import App from "./App";
import Vue from "vue";
new Vue({
    el:"#app",
    components:{
        App
    },
    render: a => a(App),
    beforeCreate(){
        Vue.prototype.$bus = this
    }
})
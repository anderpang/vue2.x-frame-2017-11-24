import Vue from "vue";
import VueStore from 'vue-j-store';
import VueRouter from 'vue-router';
import axios from 'axios';
import validator from "vue-j-validator";
import lazyload from "vue-j-validator";

import dialog from "../plugins/dialog/";

Vue.use(VueRouter)
   .use(VueStore)
   .use(validator,{
       callback(err){
           if(err){
             Vue.prototype.$tip(err);
           }
       }
   })
   .use(dialog)
   .use(lazyload,{
      loading:"http://img.zcool.cn/community/012c0258d8bb35a801219c77694def.gif"
   })
   .prototype.$http=axios;

   /**
    * 重写源码KeepAlive，以便路由控制KeepAlive，以及和<transition>结合运用
    */
   var KeepAlive=Vue.options.components.KeepAlive,
       oldRender=KeepAlive.render;
   KeepAlive.render=function(){
       var vnode=oldRender.call(this);
       vnode&&(vnode.data.keepAlive =this.$route.meta.keepAlive);
       return vnode;
   };

VueStore.prototype.$http=axios;


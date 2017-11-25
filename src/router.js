import VueRouter from "vue-router";
import store from "./components/store";
import Home from "./pages/home.vue";


const router=new VueRouter({
    mode:"history",
    routes:[
        {path:"/",component:Home},
        {path:"/slider",component:resolve=>require(["./pages/slider.vue"],resolve)},
        {path:"/login",component:resolve=>require(["./pages/login.vue"],resolve)},
        {path:"/user",meta:{requiresAuth:true},component:resolve=>require(["./pages/user.vue"],resolve)},
        {path:"/lazylist",meta:{keepAlive:true},component:resolve=>require(["./pages/lazy-list.vue"],resolve)},
        {path:"*",component:resolve=>require(["./pages/404.vue"],resolve)}
    ]
});

router.beforeEach((to, from, next) => { 
     
     var state=store.state,
         fromIndex,
         toIndex=state.dirCache[to.fullPath],
         pageTransition;
         if(isNaN(toIndex)){
            store.commit("pushDirCache",to.fullPath);
            pageTransition="forward";
         }
         else
         {
            fromIndex=state.dirCache[from.fullPath];
            pageTransition=!isNaN(fromIndex)&&toIndex<fromIndex?"reverse":"forward";
           
         }     
         store.commit("pageTransition",pageTransition);    

    if (to.meta.requiresAuth&&!state.userinfo) {        
        next('/login');
    } else {
       next()
    }
  });

 export default router;
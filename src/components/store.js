import VueStore from "vue-j-store";

export default new VueStore({
    state:{
        userinfo:null,
        redirct:null,
        direction:"forward",
        dirIndex:1,
        dirCache:{
            "/":0
        }
    },
    actions:{
        login(context,data){
            context.$http.post("/api/login",data).then(function(res){
                context.commit("login",res.data);
            }).catch(function(err){
               console.log(err);
            });            
        }
    },
    mutations:{
        login(state,userinfo){
           state.userinfo=userinfo;
        },
        pushDirCache(state,path){
           state.dirCache[path]=state.dirIndex++;
        },
        pageTransition(state,type){
            state.direction=type;
        }
    }
});
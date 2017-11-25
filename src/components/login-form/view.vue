<template>
    <form v-valid.prevent="submit" class="form">
        userid:<input type="text" v-model="userid" /><br />
        用户名：<input v-model="name" required data-required="请填写用户名" /></br />
        <input type="submit" value="登录" />
    </form>
</template>

<script>
import store from "../store";
export default {
    name:"keep-alive",
    data(){
        return {
            userid:"666",
            name:"马三溜"
        }
    },
    methods:{
      ...store.mapActions(),
      submit(){
          var data={
              id:this.userid,
              name:this.name
          };
          this.login(data);
      }
    },

    computed:store.mapState("userinfo"),
    watch:{
       //登录后跳转
       userinfo(info){
           info&&this.$router.push(this.$store.state.redirect||this.$router.options.routes[0]);           
       }
    },
    store
};
</script>

<style>
 .form{border:1px solid #CCC;}
</style>
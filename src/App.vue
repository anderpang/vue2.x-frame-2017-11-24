<template>
  
  <div id="app"> 
    <transition :name="'page-'+$store.state.direction">       
       <keep-alive>
          <router-view></router-view>
       </keep-alive>
    </transition>

    <footer class="footer">
        测试图片路径：
        <img src="./assets/logo.png">
        <div class="bg"></div>
    </footer>
  </div>
  
</template>

<script>
import store from "./components/store";

export default {
  name: 'app',
  store
}
</script>

<style lang="less">
@color:red;

html{height:100%;font-size:calc(100vw/32);overflow:hidden;}
body{min-width:320px;height:100%;font:normal 12px/1.8 "Microsoft YaHei",Verdana,Tahoma;color:#333;overflow:hidden;}
body,ul,dl,dt,dd{margin:0;padding:0;}
ul{list-style-type:none;}
a{text-decoration:none;}
img{max-width:100%;}
a img{border:none;}

.page{position:absolute;width:100%;height:100%;overflow:auto;background:#FFF;-webkit-overflow-scrolling:touch;}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;  
}

h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}

.red{display:flex;color:@color;}
.footer{
  position:fixed;z-index:5;left:0;bottom:0;width:100%;height:2em;background:#FFF;border-top:1px solid #CCC;
  &>img{height:100%;}
}
.bg{display:inline-block;width:3em;height:2em;background:url(./assets/logo.png) no-repeat 50% 50%;background-size:contain;}

/* 页面切换动画 */  
  .page-forward-enter-to,
  .page-forward-leave-to,
  .page-reverse-enter-to,
  .page-reverse-leave-to{
    transition: all .3s;
    background:#FFF;
  }

  .page-forward-enter-to,
  .page-reverse-enter-to{
    height: 100%;
    top: 0;
    position: absolute;
  }

  .page-forward-enter{
    transform: translate(100%, 0) translateZ(0);
  } 
  .page-forward-leave-to {
    transform: translate(-80%, 0) translateZ(0);
  }

  .page-reverse-enter{
    transform: translate(-100%, 0) translateZ(0);
  }
  .page-reverse-leave-to {
    transform: translate(80%, 0) translateZ(0);
  }

</style>

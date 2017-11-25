<template>
  <header class="header">
    {{$store.state.direction}}<br />
    {{$store.state.userinfo?$store.state.userinfo:'未登录'}}
    <ul class="nav">
      <li><router-link to="/">首页</router-link></li>
      <li><router-link to="/slider">轮播图</router-link></li>
      <li><router-link to="/login">登录</router-link></li>
      <li><router-link to="/user">用户中心（需登录）</router-link></li>
      <li><router-link to="/lazyList">图片懒加载</router-link></li>
      <li><router-link to="/aaa">404错误</router-link></li>
    </ul>
  </header>
</template>

<script>
import store from "../store";

export default {
  name:"header-view",
  store
}
</script>

<style lang="less">
.header{padding-top:5em;height:5em;}
.nav {
  position: fixed;
  left:0;
  width:100%;
  list-style-type: none;
  padding: 0;
  &>li{
     display: inline-block;
     margin: 0 .3em;
  }
}
</style>
<template>
   <div class="page">
       <header-view />
       home<br /><br />
       <button @click="showTip">提示信息</button><br /><br />
       <button @click="showDialog">弹窗信息</button><br /><br />
       <button @click="showLoading">loading层</button>
   </div>
</template>

<script>
export default {
   methods:{
       showTip(){
           this.$tip("提示信息！");
       },
       showDialog(){
           this.$dialog({
               content:"确认删除？"
           }).$on("close",function(){
               alert("取消")
           }).$on("ok",function(){
               alert("点了确定")
           });
       },
       showLoading(){
           this.$loading(true);
       }
   }
};
</script>
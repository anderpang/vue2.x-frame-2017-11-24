  <template>
    <div class="page" v-use-lazy>
        <header-view />
        <ul class="pic-list">    
            <li class="item" v-for="(item,i) in list" :key="i" :title="item.who">
                <pic-link :href="item.url" />
            </li>
        </ul>
    </div>
  </template>
  
<script>
    export default {
        name: 'list',
        data () {
            return {               
               list:[]
            }
        },
        created:function(){
            this.$http.get("http://gank.io/api/data/%E7%A6%8F%E5%88%A9/30/1").then(function(res){
                this.list.push(...res.data.results);  
            }.bind(this));
        },
        activated: function () {            
            this.$el.scrollTop=this.scrollTop;
        },
        deactivated: function () {
            this.scrollTop=this.$el.scrollTop;
        },
        components:{
            PicLink:{
                props:["href"],
                template:'<a class="pic" :href="href" target="_blank" v-lazy="href"></a>'
            }
        }
    };
</script>

<style>
   .pic-list>li{}
   .pic{display:block;height:100%;min-height:30vh;background:none no-repeat 50% 50%;background-size:contain;}
</style>
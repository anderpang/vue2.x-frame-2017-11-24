<template>
    <transition name="dialog">
        <div :class="['dialog-cover',className]" @click.stop="onClick($event)" v-if="show">
            <div class="dialog-box" :style="getCssStyle()">
                <header class="dialog-header" v-if="showHeader">
                    {{title}}
                </header>
                <i class="dialog-close-btn dialog-close" v-if="showCloseButton"></i>
                <div class="dialog-body">
                    <slot>{{content}}</slot>
                </div>
                <footer class="dialog-footer" v-if="showFooter">
                    <button class="dialog-btn dialog-close" v-if="showCancelButton">{{cancelText}}</button>
                    <button class="dialog-btn dialog-ok-btn" @click.stop="ok" v-if="showOkButton">{{okText}}</button>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props:{
        value:{
            type:Boolean,
            default:false,
        },
        title:{
            type:String,
            default:"提示"
        },        
        content:{
            type:String,
            default:""
        },
        width:{
            type:String,
            default:''
        },
        height:{
            type:String,
            default:''
        },
        className:{
            type:String,
            default:''
        },
        showHeader:{
            type:Boolean,
            default:true
        },
        showFooter:{
            type:Boolean,
            default:true
        },
        showCloseButton:{
            type:Boolean,
            default:true
        },
        showCancelButton:{
            type:Boolean,
            default:true
        },
        showOkButton:{
            type:Boolean,
            default:true
        },
        cancelText:{
            type:String,
            default:"取消"
        },
        okText:{
            type:String,
            default:"确定"
        },
        enableCoverClick:{
           type:Boolean,
           default:true
        }
    },
    data(){
        return {
            show:this.value
        }
    },
    methods:{
       onClick(e){
          var t=e.target,
              ct=e.currentTarget;
          if(t===ct){
            this.enableCoverClick&&(this.show=false);
            return;
          }
          while(t&&t!==ct)
          {
            if(t.classList.contains("dialog-close")){
               this.show=false;
               break;
            }
            t=t.parentNode;
          }
       },
       ok(){
           this.$emit("ok",this);
       },
       getCssStyle(){
           var style={};
           this.width&&(style.width=this.width);
           this.height&&(style.height=this.height);
           return style;
       }
    },
    watch:{
        value(){
            this.show=this.value;
        },
        show(){
            this.$emit("input",this.show);
            if(this.show)
            {
                this.$emit("open",this.$el);
            }
            else
            {
                this.$emit("close",this.$el);
            }
        }        
    },
    updated(){
        if(this._context&&this.$el.nodeType===8){
            this._context.removeChild(this.$el);
        }
    }
};
</script>

<style>
.dialog-enter-to,
.dialog-leave-to{transition:opacity .3s;}
.dialog-enter,
.dialog-leave-to{opacity:0;}
.dialog-enter>.dialog-box,
.dialog-leave-to>.dialog-box{transform:translateY(-50%) scaleZ(1);}
.dialog-enter-to>.dialog-box,
.dialog-leave-to>.dialog-box{transition:all .3s;}
.dialog-cover{display:flex;justify-content:center;align-items:center;position:fixed;left:0;top:0;z-index:900;width:100%;height:100%;background:rgba(0,0,0,.8);}
.dialog-box{position:relative;width:30%;min-width:300px;margin:0 auto;background:#FFF;}
.dialog-close-btn{position:absolute;top:0;right:0;width:2em;height:2em;opacity:.7;background:url(data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEtZmxhdC0yMDAzMDExNC5kdGQiPgo8c3ZnIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiI+CjxsaW5lIHgxPSI1IiB5MT0iNSIgeDI9IjI1IiB5Mj0iMjUiIC8+CjxsaW5lIHgxPSIyNSIgeTE9IjUiIHgyPSI1IiB5Mj0iMjUiIC8+CjwvZz4KPC9zdmc+) no-repeat 50% 50%;background-size:50%;cursor:pointer;}
.dialog-close-btn:hover{opacity:1;}
.dialog-header,
.dialog-body,
.dialog-footer{padding:.5em 1em;}
.dialog-body{min-height:1em;}
.dialog-footer{text-align:center;}
.dialog-btn{white-space: nowrap;cursor: pointer;background: #fff; border: 1px solid #d8dce5;border-color: #d8dce5;color: #5a5e66;-webkit-appearance: none;text-align: center;outline: none;transition: .1s;user-select: none;padding: .5em 1.5em;border-radius: 4px;margin:0 1em;}
.dialog-ok-btn{color:#fff;background-color:#409eff;border-color:#409eff;}
.dialog-btn:hover{color:#409eff;border-color:#c6e2ff;background-color:#ecf5ff;}
.dialog-ok-btn:hover{background:#66b1ff;border-color:#66b1ff;color:#fff}

.dialog-tip{position:fixed;z-index:900;left:0;top:0;right:0;bottom:0;margin:auto;width:20em;height:3em;line-height:3em;line-height:3em;border-radius:3px;text-align:center;color:#FFF;background:rgba(0,0,0,.8);pointer-events:none;}
.dialog-tip.show{visibility:hidden;opacity:0;transition:opacity 1s 3s,visibility 4s;}

.dialog-loading{display:none;position:fixed;z-index:990;left:0;top:0;width:100%;height:100%;outline:none;background:rgba(255,255,255,0) url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHN0eWxlPmNpcmNsZXtzdHJva2UtZGFzaG9mZnNldDoxNjA7YW5pbWF0aW9uOmEgMS42cyBpbmZpbml0ZTt9QGtleWZyYW1lcyBhezEwMCV7c3Ryb2tlLWRhc2hvZmZzZXQ6LTE2MDt9fTwvc3R5bGU+CjxjaXJjbGUgY3g9IjMwLjMxMDI1IiBjeT0iMjkuODMyOTMiIHI9IjIyLjkxMTY5IiBmaWxsPSJub25lIiBzdHJva2U9IiNDQ0MiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWRhc2hhcnJheT0iMTYwLDE2MCIgLz4KPC9zdmc+) no-repeat 50% 50%;background-size:2.2em;}
.dialog-loading.show{display:block;}
</style>
/**
 * 图片懒加载，先Vue.use，需v-use-lazy。
 * @param {Boolean} v-use-lazy 若为true，滚动对象为window，否则为当前元素 
 * @param {String} v-lazy 图片地址
 */

var lazyload={
    _listeners:[],
    _context:null,
    _is_use:false,
    bg:true,
    timeout:100,
    loading:null, 
    error:null,
    _toggleScroll(bl){
        this._is_use=bl;
        this._context[bl?"addEventListener":"removeEventListener"]("scroll",this._scroll,false);
        if(!bl){
            this._context=null;
            this._listeners.length=0;
        }
    },
    _checkInView(el,src){
        var bound=el.getBoundingClientRect();
        if(bound.bottom>0&&bound.top<this.height){           
            this._loadImg(el,src);
            return true;
        }
        return false;
     },
     _loadImg(el,src){
         var img=new Image(),
             bg=this.bg,
             err=this.error;
 
         img.onload=function(){
             bg?el.style.backgroundImage="url('"+src+"')":el.src=src;
         };
 
         if(err){
             img.onerror=function(){
                bg?el.style.backgroundImage="url('"+this.err+"')":el.src=this.err;
             };
         }
 
         img.src=src;
     },
     _scroll(e){
         var timestamp=e&&e.timeStamp||Date.now(),
             timeout=this.timeout;
          clearTimeout(this._timer);
 
         if(timestamp-this._timestamp>timeout)
         {        
             var ls=this._listeners,
             i=ls.length;
 
             while(i--){
                 if(this._checkInView(ls[i].el,ls[i].src)){
                     ls.splice(i,1);
                 }
             }
         }
         else
         {
           this._timer=setTimeout(this._scroll,timeout);
         }
         this._timestamp=timestamp;
    },
    install(Vue,options){
        if(this.installed)return;        
        var _this=this;
        this.installed=true;
        
        options=options||{};
        options.bg===false&&(this.bg=false);
        this.timeout=options.timeout||this.timeout;
        this.loading=options.loading||this.loading;
        this.error=options.error||this.error;

        this.height=window.innerHeight;
        this._scroll=this._scroll.bind(this);

        function bind(el,binding){ 
            if(_this._is_use)return;  
            _this._context=binding.value?window:el;            
            _this._toggleScroll(true);
        }

        Vue.directive("use-lazy",{
            inserted:bind,
            update:bind,             
             unbind(){
                _this._toggleScroll(false);
             }
        });


        Vue.directive("lazy",{
            inserted(el,binding){   
               var loading=_this.loading;

               if(loading){
                  _this.bg?el.style.backgroundImage="url('"+loading+"')":el.src=loading;
               }
               if(_this._checkInView(el,binding.value)){
                   return;
               }
        
               _this._listeners.push({
                   el:el,        
                   src:binding.value
               });
            },
           update(el,binding){
              if(binding.value===binding.oldValue)return;
        
               var ls=_this._listeners,
                   i=ls.length,
                   has=false;
                while(i--){
                    if(ls[i].el===el){
                        ls[i].src=binding.value;
                        has=true;
                        break;
                    }
                }
        
                has||_this.inserted(el,binding);
            },
            
            unbind(el,binding){
               var ls=_this._listeners,
                   i=ls.length;
                while(i--){
                    if(ls[i].el===el){
                        ls.splice(i,1);
                        break;
                    }
                }
            }
        });

    }
};

export default lazyload;
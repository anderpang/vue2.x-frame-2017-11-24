import _Dialog from "./view.vue";

function dialog(Vue){
    const Vm=Vue.extend(_Dialog);
    const bd=document.body;
    Vue.prototype.$dialog=function(options){
         var vm=new Vm({propsData:options}),
             el=vm.$mount().$el,
             context=options&&options.context;

         vm._context=context?context===this?this.$el:context:bd;
         vm._context.appendChild(vm.$mount().$el);
         vm._context.offsetHeight;
         vm.show=true;
         return vm;
    };

    Vue.prototype.$tip=function(msg){
          var d=document,
              tip=d.createElement("span");
          tip.className="dialog-tip";

          function f(msg){
              tip.innerHTML=msg;
              tip.classList.remove("show");
              tip.offsetHeight;
              tip.classList.add("show");
          }

          d.body.appendChild(tip);
          f(msg);
          this.$tip=f;          
    };

    Vue.prototype.$loading=function(bl){
        var d=document,
            ctx=d.createElement("div");
        ctx.className="dialog-loading";
        ctx.tabIndex="-1";

        function f(bl){
            ctx.classList[bl?'add':'remove']("show");
            bl&&ctx.focus();
        }

        d.body.appendChild(ctx);
        f(bl);
        this.$loading=f;          
  };
}

export default dialog;
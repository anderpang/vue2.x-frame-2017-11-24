<template>
    <div class="page">
        <header-view />
        <div class="swiper-container" ref="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="slide in swiperSlides">
                    <div :data-background="slide.url" class="swiper-lazy">
                        <div class="swiper-lazy-preloader swiper-lazy-preloader"></div>
                    </div>  
                </div> 
                             
            </div>
            <div ref="pagination" class="swiper-pagination swiper-pagination-white"></div>
        </div>
  </div>
</template>

<script>
    import Swiper from 'swiper';
    import "swiper/dist/css/swiper.min.css";

    export default {
        name:"slider",
        data () {
            return {
                swiperSlides: []
            }
        },
        created:function(){
             this.$http.get("http://gank.io/api/data/%E7%A6%8F%E5%88%A9/5/1").then(function(res){
                 this.swiperSlides.push(...res.data.results);  
             }.bind(this));
        },
        updated(){
            this.$swiper&&this.$swiper.stopAutoplay();
            this.$swiper=new Swiper(this.$refs.swiper, {
                    lazyLoading : true,
                    loop:true,
                    autoplay:5000,
                    speed:500,
                    autoplayDisableOnInteraction:false,
                    pagination : this.$refs.pagination
            });
        },
        beforeDestory(){
            this.$swiper.stopAutoplay();
        }
    };
</script>

<style>
 .swiper-lazy{height:0;padding-top:40%;background:none no-repeat 50% 50%;background-size:cover;}
</style>

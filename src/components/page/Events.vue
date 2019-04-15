<template>
    <div>
      <v-e-header></v-e-header>
      <div class="row">
        <div class="col-md-6">
          <div class="container">
            <b-carousel id="carousel1"
                        style="text-shadow: 1px 1px 2px #333;"
                        controls
                        indicators
                        background="#ababab"
                        :interval="3000"
                        img-width="1024"
                        img-height="480"
                        v-model="slide"
                        @sliding-start="onSlideStart"
                        @sliding-end="onSlideEnd">
              <b-carousel-slide
                img-src="http://wimg.huodongxing.com/logo/201810/4462089595800/473208968698877_v2.jpg@!wmlogo">
              </b-carousel-slide>

              <b-carousel-slide
                img-src="http://wimg.huodongxing.com/logo/201810/3464394711011/123225432507667_v2.jpg@!wmlogo">
              </b-carousel-slide>

              <b-carousel-slide
                img-src="http://wimg.huodongxing.com/logo/201809/6458559053600/823225707741273_v2.jpg@!wmlogo">
              </b-carousel-slide>

              <b-carousel-slide
                img-src="http://wimg.huodongxing.com/logo/201809/4458765453500/603219498206211_v2.jpg@!wmlogo">
              </b-carousel-slide>
              <b-carousel-slide
                img-src="http://wimg.huodongxing.com/logo/201810/8461293892200/973211671045321_v2.jpg@!wmlogo">
              </b-carousel-slide>
            </b-carousel>
          </div>
        </div>
        <div class="col-md-6">
          <div class="container">
            <h2>日历</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
</template>

<script>
  import vEHeader from '../twohead/EHeader.vue'
  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    components:{
      vEHeader
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>

<style scoped>
  .container{
    background-color: #F8F8F8;
  }
  .row{
    margin-top: 15px;
  }
</style>

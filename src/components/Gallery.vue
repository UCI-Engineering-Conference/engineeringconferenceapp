<template>
  <div>
    <div class="page-header">
      <p>Gallery</p>
    </div>
    <div>
      <button class="arrow-left" @click="switchYear(-1)"></button>
      <h4>{{ displayGallery }}</h4>
      <button class="arrow-right" @click="switchYear(1)"></button>
    </div>
    <div class="gallery-wrapper">
      <transition name="slide-fade" mode="out-in">
        <div class="container" v-bind:key="currentGallery">
          <ul class="img-gallery">
            <li v-for="i in currentRollLen" v-bind:key="i">
              <a download="EngineeringConferenceFootage.jpg" :href="galleryImgPreUrl(i)" title="Engineering Conference">
                <img :src="galleryImgPreUrl(i)">
              </a>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      totalGalleries: 7,
      currentGallery: 0,
      displayGallery: '2019 Roll1',
      currentRollLen: 50
    }
  },
  methods: {
    galleryImgPreUrl (img) {
      switch (this.currentGallery) {
        case 0:
          return '/static/Gallery/2019Roll1/image'.concat(img).concat('.jpg')
        case 1:
          return '/static/Gallery/2019Roll2/image'.concat(img).concat('.jpg')
        case 2:
          return '/static/Gallery/2019Roll3/image'.concat(img).concat('.JPG')
        case 3:
          return '/static/Gallery/2019Roll4/image'.concat(img).concat('.JPG')
        case 4:
          return '/static/Gallery/2019Roll5/image'.concat(img).concat('.jpg')
        case 5:
          return '/static/Gallery/2019Roll6/image'.concat(img).concat('.jpg')
        case 6:
          return '/static/Gallery/2019Roll7/image'.concat(img).concat('.jpg')
      }
    },
    switchYear (inc) {
      if (this.currentGallery + inc < 0) this.currentGallery = this.totalGalleries - 1
      else if (this.currentGallery + inc >= this.totalGalleries) this.currentGallery = 0
      else this.currentGallery += inc
      this.displayGallery = 2019
      switch (this.currentGallery) {
        case 0:
          this.currentRollLen = 50
          this.displayGallery = '2019 Roll 1'
          break
        case 1:
          this.currentRollLen = 50
          this.displayGallery = '2019 Roll 2'
          break
        case 2:
          this.currentRollLen = 50
          this.displayGallery = '2019 Roll 3'
          break
        case 3:
          this.currentRollLen = 50
          this.displayGallery = '2019 Roll 4'
          break
        case 4:
          this.currentRollLen = 50
          this.displayGallery = '2019 Roll 5'
          break
        case 5:
          this.currentRollLen = 50
          this.displayGallery = '2019 Roll 6'
          break
        case 6:
          this.currentRollLen = 15
          this.displayGallery = '2019 Roll 7'
          break
      }
    }
  }
}
</script>

<style scoped>

  .img-gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .img-gallery li {
    flex-basis: 200px;
  }
  .img-gallery li img{
    border: 1px solid var(--black-color);
    margin: 4px;
    width: 200px;
  }

  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  .arrow-left, .arrow-right{
    cursor: pointer;
    margin: 10px;
    font-size: 30px;
    border: none;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
  }
  .arrow-right:hover, .arrow-left:hover{
    color:  var(--green-color);
  }
  .arrow-left:before {
    content: '\00ab';
  }
  .arrow-right:before {
    content: '\00bb';
  }
  h4, button {
    display:inline-block;
    vertical-align: middle;
  }

  .page-header {
    background-image:
      linear-gradient(rgba(0, 0, 0, var(--page-header-bg)), rgba(0, 0, 0, var(--page-header-bg))),
      url(/static/page-headers/gallery.jpg);
  }

</style>

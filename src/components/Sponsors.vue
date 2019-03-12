<template>
  <div>
    <div class="page-header">
      <p>Partners</p>
    </div>
    <div>
      <button class="arrow-left" @click="switchYear(1)"></button>
      <h4>{{ displayYear }}</h4>
      <button class="arrow-right" @click="switchYear(-1)"></button>
    </div>
    <div class="sponsor-wrapper">
      <transition name="slide-fade" mode="out-in">
        <div class="container" v-bind:key="currentYear">
          <div class="sponsors">
            <ul class="sponsor-grid">
              <li v-for="(sponsor, index) in sponsor_data[currentYear]['general']" v-bind:key="index">
                <img class="sponsor-image" :src="imgPreUrl(sponsor)">
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>

  </div>
</template>
<script>
import Sponsors from '../../static/Sponsors.json'
export default {
  data () {
    return {
      imgLocation: '/static/sponsors/',
      sponsor_data: Sponsors,
      currentYear: 0,
      displayYear: Sponsors[0].year
    }
  },
  methods: {
    imgPreUrl (img) {
      return this.imgLocation.concat(img)
    },
    switchYear (inc) {
      if (this.currentYear + inc < 0) this.currentYear = this.sponsor_data.length - 1
      else if (this.currentYear + inc >= this.sponsor_data.length) this.currentYear = 0
      else this.currentYear += inc
      this.displayYear = this.sponsor_data[this.currentYear].year
    }
  }
}
</script>
<style scoped>
  .sponsor-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 40px;
  }
  .sponsor-image {
    max-width: 60%;
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
    color:  #65D25C;
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
  button {
    padding: 10px;
  }
  .page-header {
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url(/static/page-headers/sponsors.jpg);
  }
  /*@media only screen and (min-width: 740px) {*/
    /*.sponsor-grid {*/
      /*grid-template-columns: 1fr 1fr;*/
    /*}*/
  /*}*/
  /*@media only screen and (min-width: 1200px) {*/
    /*.sponsor-grid {*/
      /*grid-template-columns: 1fr 1fr 1fr;*/
    /*}*/
  /*}*/
</style>

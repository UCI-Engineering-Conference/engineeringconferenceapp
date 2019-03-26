<template>
 <div>
  <section style="overflow:hidden;">
    <div class="page-header">
      <p>About</p>
    </div>
    <h1>What even is an Engineering Conference?</h1>
    <p>We're so glad you asked. Here are some of the question that students normally have. But don't hesitate to  <router-link to="/contact">ask us your own</router-link>!</p>
    <div class="faq-card">
      <ul class="faq-grid">
        <li v-for="(data, index) in faqList" :key="index">
          <img class="faq-image" :src="imgPreUrl(data.img)"/>
          <div class="faq-title">{{ data.title }}</div>
          <div class="faq-description">{{ data.description }}</div>
        </li>
      </ul>
    </div>
    <div class="img-strip-wrapper">
      <ul class="img-strip">
        <li v-for="img in image_strip.delegates2" v-bind:key="img">
          <img :src="miscImgPreUrl(img)">
        </li>
      </ul>
    </div>
  </section>
 </div>
</template>
<script>
import FAQList from '../../static/FAQList.json'
import ImageStrip from '../../static/ImageStrips.json'
export default {
  data () {
    return {
      faqList: FAQList,
      imgLocation: '/static/faqpics/',
      miscImgLoc: '/static/misc-pics/',
      image_strip: ImageStrip
    }
  },
  methods: {
    imgPreUrl (img) {
      return this.imgLocation.concat(img)
    },
    miscImgPreUrl (img) {
      return this.miscImgLoc.concat(img)
    }
  }
}
</script>
<style scoped>
  p a {
    text-decoration: none;
    color: var(--green-color);
  }
  p a:hover {
    text-decoration: underline;
  }
  .faq-title {
    font-size: 14px;
    padding: 5px 0;
  }
  .faq-description {
    font-size: 11px;
    padding:10px;
  }
  .faq-image {
    width: 300px;
  }
  .faq-grid li {
    width: 300px;
    color: var(--light-black-color);
    margin: 20px auto;
    background: rgba(255, 255, 255, 0.8) url("/static/img/ecgraphic.png") no-repeat;
    background-size: 50%;
    background-blend-mode: lighten;
  }
  .faq-grid li:nth-child(odd) {
    background-position: right;
  }
  .page-header {
    background-image:
      linear-gradient(rgba(0, 0, 0, var(--page-header-bg)), rgba(0, 0, 0, var(--page-header-bg))),
      url(/static/page-headers/about.jpg);
  }
  @media only screen and (min-width: 660px) {
    .faq-image {
      width: 300px;
      vertical-align: middle;
      float:right;
      margin-left: 10px
    }
    .faq-grid li {
      width: 600px;
      margin: 30px 20px;
      text-align: right;
      display: inline-block;
    }
    .faq-grid li:nth-child(odd) {
      text-align:left;
    }
    .faq-grid li:nth-child(odd) .faq-image {
      float:left;
      margin-left:0px;
      margin-right: 10px;
    }
  }
  @media only screen and (min-width: 1000px) {
    .faq-title {
      font-size: 22px;
      padding: 10px 0;
    }
    .faq-description {
      font-size: 18px;
    }
    .faq-image {
      width: 300px;
    }
    .faq-grid li {
      width: 970px;
    }
  }
</style>

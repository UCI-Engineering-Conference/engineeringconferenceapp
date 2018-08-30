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
  </section>
 </div>
</template>
<script>
import FAQList from '../../static/FAQList.json'
export default {
  data () {
    return {
      faqList: FAQList,
      imgLocation: '/static/faqpics/'
    }
  },
  methods: {
    imgPreUrl (img) {
      return this.imgLocation.concat(img)
    }
  }
}
</script>
<style scoped>
  .faq-title {
    font-size: 14px;
    padding: 5px 0;
  }
  .faq-description {
    font-size: 11px;
    padding:10px;
  }
  .faq-image {
    height: 180px;
    border: 5px solid #65D25C;
    border-radius: .5em .5em 0 0;
  }
  .faq-grid li {
    width: 280px;
    border-bottom: 1em solid #65D25C;
    border-radius: .5em;
    background-color: #D3D3D3;
    color: #606060;
    margin: 20px auto;
  }
  .faq-grid li:nth-child(odd) {
    background-color: #808080;
    color: #EAEAEA;
  }
  .faq-grid li:nth-child(odd) .faq-image {
    border: 5px solid #A2E49D;
  }
  .page-header {
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url(/static/page-headers/about.jpg);
  }
  @media only screen and (min-width: 660px) {
    .faq-image {
      height: 150px;
      border: 5px solid #65D25C;
      border-radius: 0 .5em .5em 0;
      vertical-align: middle;
      float:right;
      margin-left: 10px
    }
    .faq-grid li {
      width: 600px;
      border-bottom: none;
      border-left: 1em solid #65D25C;
      border-radius: .5em;
      background-color: #D3D3D3;
      color: #606060;
      margin: 30px 20px;
      text-align: right;
      display: inline-block;
    }
    .faq-grid li:nth-child(odd) {
      border-left: none;
      border-right: 1em solid #A2E49D;
      background-color: #808080;
      text-align:left;
      color: #EAEAEA;
    }
    .faq-grid li:nth-child(odd) .faq-image {
      float:left;
      margin-left:0px;
      margin-right: 10px;
      border: 5px solid #A2E49D;
      border-radius: .5em 0 0 .5em;
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
      height: 250px;
    }
    .faq-grid li {
      width: 970px;
    }
  }
</style>

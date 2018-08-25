<template>
  <div>
    <h1>UCI ENGINEERING CONFERENCE 2019</h1>
    <p>{{ date }}</p>

    <button
      type="button"
      class="btn"
      @click="showModal"
    >
      Join our Community!
    </button>

    <modal
      v-show="isModalVisible"
      @close="closeModal"
    />

    <!--<carousel :per-page="1" :loop="true" :autoplay="true" :autoplayTimeout="3000" :autoplayHoverPause="true" >-->
      <!--<slide class="slide1">-->
        <!--<h2>Our Mission</h2>-->
        <!--<p class="carousel-text">Provide students with a hands-on experience to solve contemporary problems-->
          <!--through education, collaboration, and debate while investing in sustainable solutions.</p>-->
      <!--</slide>-->
      <!--<slide class="slide2">-->
        <!--<h2>Our Vision</h2>-->
        <!--<p class="carousel-text">Engineering Conference aims to develop under-resourced communities and be universally-->
          <!--recognized for empowering students to envision their future careers as global leaders.</p>-->
      <!--</slide>-->
    <!--</carousel>-->

    <div class="numbers">
      <h2>Engineering Conference 2018</h2>
      <ul class="horizontal-list">
        <li><b>169</b> Engineers.</li>
        <li><b>3</b> Days.</li>
        <li><b>37</b> Students Published.</li>
      </ul>
    </div>

    <div>
      <h2>Apply Now</h2>
    </div>

    <div>
      <div>
        <a href="https://escholarship.org/uc/item/5qb1r7tv">SolarFlair</a>
      </div>
      <div>
        <a href="https://escholarship.org/uc/item/5rc1q3xr">Connect the Zots</a>
      </div>
    </div>

    <section style="overflow:hidden;">
      <h2>What is an Engineering Conference?</h2>
      <p>We're so glad you asked. Here are some of the question that students normally have. But don't hesitate to  <router-link to="/sponsors">ask your own</router-link>!</p>
      <div class="faq-card">
        <ul class="faq-grid">
          <li v-for="(data, index) in faqList" :key="index">
            <img class="faq-image" :src="imgPreUrl(data.img)"/>
            <div class="faq-title">{{ data.title }}</div>
            <span class="faq-description">{{ data.description }}</span>
          </li>
        </ul>
      </div>
    </section>

    <br/>

    <section>
      <h2>Interested in joining our team?</h2>
      <p>Are you creative, dedicated, and want to have a global impact?</p>
      <p>UCI Engineering Conference wants students like you!</p>
      <p>Click <router-link to="/jointheteam">Here</router-link> to see what positions are available.</p>
    </section>

    </div>
</template>

<script>
import FAQList from '../../static/FAQList.json'
import modal from './MailingListModal.vue'
export default {
  components: {
    modal
  },
  data () {
    return {
      isModalVisible: false,
      date: '00 - 00',
      faqList: FAQList,
      imgLocation: '/static/faqpics/'
    }
  },
  methods: {
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    imgPreUrl (img) {
      return this.imgLocation.concat(img)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.slide1 {
  color: #FFFFFF;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(/static/img/UCISchoolofEngineering.png);
  background-repeat:   no-repeat;
  background-position: center center;
  background-size: cover;
  padding-top: 100px;
  padding-bottom: 100px;
}
.slide2 {
  color: #FFFFFF;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(/static/img/UCISchoolofEngineering.png);
  background-repeat:   no-repeat;
  background-position: center center;
  background-size: cover;
  padding-top: 100px;
  padding-bottom: 100px;
}
.carousel-text {
  margin: 0 50vh 0 50vh;
}
.numbers {
  display: table;
  margin: 0 auto;
}
.horizontal-list {
  min-width: 696px;
  padding-top: 20px;
}
.horizontal-list li {
  display: inline;
}

.faq-title {
  font-size: 1.5em;
  padding: 20px 0;
}
.faq-description {
  font-size: 1em;
}
.faq-image {
  height: 250px;
  border: 5px solid #65D25C;
  border-radius: 0 .5em .5em 0;
  vertical-align: middle;
  float:right;
  margin-left: 10px
}
.faq-grid li {
  border-left: 1em solid #65D25C;
  border-radius: .5em;
  background-color: #D3D3D3;
  color: #606060;
  margin: 10px 0;
  text-align: right;
  display: inline-block;
  width: 970px;
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

</style>

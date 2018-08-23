<template>
  <div>
    <h1>UCI ENGINEERING CONFERENCE 2019</h1>
    <p>{{ date }}</p>
    <div>
      <div class="nameFormInput">
        <input type="text" v-model="user.name" v-validate="'required'" name="username">
        <span class="alert">{{ errors.first('username') }}</span>
      </div>
      <div class="emailFormInput">
        <input type="text" v-model="user.email" v-validate="'required|email'" name="email">
        <span class="alert">{{ errors.first('email') }}</span>
      </div>
      <div class="phoneFormInput">
        <input type="text" v-model="user.phone">
      </div>
      <button @click="postEmail">Sign Up</button>
    </div>

    <carousel :per-page="1" :loop="true" :autoplay="true" :autoplayTimeout="3000" :autoplayHoverPause="true" >
      <slide class="slide1">
        <h2>Our Mission</h2>
        <p class="carousel-text">Provide students with a hands-on experience to solve contemporary problems
          through education, collaboration, and debate while investing in sustainable solutions.</p>
      </slide>
      <slide class="slide2">
        <h2>Our Vision</h2>
        <p class="carousel-text">Engineering Conference aims to develop under-resourced communities and be universally
          recognized for empowering students to envision their future careers as global leaders.</p>
      </slide>
    </carousel>

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

    <div>
      <h2>What is an Engineering Conference?</h2>
      <p>We're so glad you asked. Here are some of the question that students normally have. But don't hesitate to  <router-link to="/sponsors">ask your own</router-link>!</p>
      <div>
        <ul>
          <li v-for="(data, index) in faqList" :key="index">
            <div class="faq-title">{{ data.title }}</div>
            <div class="faq-title">{{ data.description }}</div>
          </li>
        </ul>
      </div>
    </div>

    <div>
      <h2>Interested in joining our team?</h2>
      <p>Are you creative, dedicated, and want to have a global impact?</p>
      <p>UCI Engineering Conference wants students like you!</p>
      <p>Click <router-link to="/jointheteam">Here</router-link> to see what positions are available.</p>
    </div>

    </div>
</template>

<script>
import { db } from '../main'
import FAQList from '../../static/FAQList.json'
export default {
  data () {
    return {
      user: {
        name: '',
        email: '',
        phone: '',
        createdAt: ''
      },
      users: [],
      date: '00 - 00',
      faqList: FAQList
    }
  },
  firestore () {
    return {
      users: db.collection('mailingList')
    }
  },
  methods: {
    addUser () {
      this.user.createdAt = new Date()
      db.collection('mailingList').add(this.user)
    },
    postEmail () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.addUser()
        } else {
          console.log('Not valid')
        }
      })
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
  list-style: none;
  padding-top: 20px;
}
.horizontal-list li {
  display: inline;
}
  .alert {
    color: red;
  }
</style>

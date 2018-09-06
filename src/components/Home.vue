<template>
  <div>
    <img class="main-image" src="/static/img/thumbnail.png"/>
    <div class="intro">
      <h1 class="intro-line1">innovate, lead, debate</h1>
      <h1 class="intro-line2">at ENGINEERING CONFERENCE</h1>
      <p class="intro-line3">University of California Irvine·{{ date }}</p>
    </div>

    <div v-if="isApplicationOpen">
      <router-link to="/application" tag="button" style="margin:30px;width:200px;height:80px;font-size: 32px;" class="submit-button"><span>Apply Now!</span></router-link>
    </div>
    <div v-else>
      <p >Applications for Engineering Conference 2019 are now closed.</p>

      <p>Join our community to be the first to know about important updates.</p>
      <button
        type="button"
        class="submit-button"
        @click="showModal"
      ><span>Sign Up</span>
      </button>
    </div>

    <modal
      v-show="isModalVisible"
      @close="closeModal"
    />

    <div class="numbers">
      <p><b>{{content.Attended}}</b> Engineers.</p>
      <p><b>{{content.Days}}</b> Days.</p>
      <p><b>{{content.Published}}</b> Students Published.</p>
    </div>

    <div class="video-section">
      <div class="video-header">
        <h2>UC Irvine's Engineering Conference is back</h2>
        <p>Gather with hundreds of engineering students of all backgrounds to research and design for solutions for contemporary problems.</p>
        <p>Our mission at EC is <i>{{content.Mission}}</i> Let us take care of the food, resources, energy, and entertainment so you can focus on the engineering.</p>
      </div>
      <div class="video-container">
        <iframe class="resp-iframe" src="https://www.youtube.com/embed/yCOshvp6BV0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
    </div>

    <!--<div class="published-papers">-->
      <!--<div>-->
        <!--<a href="https://escholarship.org/uc/item/5qb1r7tv">SolarFlair</a>-->
      <!--</div>-->
      <!--<div>-->
        <!--<a href="https://escholarship.org/uc/item/5rc1q3xr">Connect the Zots</a>-->
      <!--</div>-->
    <!--</div>-->
    <div class="philanthropy">
      <h2>Our Vision</h2>
      <p><i>{{ content.Vision }}</i> Imagine what would happen if the money you spent on Engineering Conference was used to build projects that helped the planet?</p>
      <p>Well, it does. And not just some of it, all of it. In the past we've raised over enough money to build a distribution system in Maventibao, Madagascar to make water more accessible. Engineers in our organization are <b>BIG</b> on philanthropy and we pick the projects that prove it. <a @click="showModal">Sign up for our news letter</a> to come with us on projects like <a href="http://corazon.org/en/the-programs/the-corazon-experience">Corazon Builds.</a> </p>
      <img class="philanthropy-img" src = '/static/img/Corazon1.jpg' />
    </div>

    <div class="recruitment">
      <h2>Interested in joining our team?</h2>
      <p>Are you <b>creative</b>, <b>dedicated</b>, and want to have a <b>global impact</b>?</p>
      <p>UCI Engineering Conference wants students like you!</p>
      <p>Click <router-link to="/jointheteam">Here</router-link> to see what positions are available.</p>
    </div>

  </div>
</template>

<script>
import modal from './MailingListModal.vue'
import homePageContent from '../../static/HomePageContent.json'
export default {
  components: {
    modal
  },
  computed: {
    isApplicationOpen () {
      return this.$store.state.applicationOpen
    }
  },
  data () {
    return {
      isModalVisible: false,
      date: 'March 3-6, 2019',
      content: homePageContent
    }
  },
  methods: {
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-image {
  padding-top: 20px;
  width: 300px;
}
.intro-line1, .intro-line2, .intro-line3 {
  padding:0;
  margin:0;
  color: #3D3D3D;
}
.intro-line1 {
  color: #FFB511;
}
.intro-line3 {
  text-transform: uppercase;
  font-weight: 400;
  color: #606060;
}
.numbers {
  margin: 20px auto;
  font-size: 5vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: #65D25C;
  padding: 15px;
  color: #FFFFFF;
  font-weight: 300;
}
.video-section {
  overflow:hidden;
  margin: 40px;
}
.video-header {
  padding: 0px 20px 0px 20px;
}
.video-container {
  position: relative;
  overflow:hidden;
  padding-top: 56.25%;
}
.resp-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.recruitment {
  background-color: #A2E49D;
  color: #3D3D3D;
  margin: 0px;
  overflow: hidden;
  padding: 20px;
  font-size: 9px;
}

.recruitment p {
  padding: 0px;
  margin: 1px;
}

a {
  cursor: pointer;
  text-decoration: none;
  color: #FFB511;
}
a:hover {
  text-decoration: underline;
}
.philanthropy {
  margin: 20px 10%;
}
.philanthropy-img {
  max-width: 80%;
  transform: scaleY(-1) scaleX(-1);
  border: 5px solid #606060;
  border-radius: .5em;
}

@media only screen and (min-width: 420px) {
  .recruitment {
    font-size: 18px;
  }
}

@media only screen and (min-width: 600px) {
  .philanthropy-img {
    max-width: 50%;
  }
}

@media only screen and (min-width: 600px) {
  .main-image {
    padding-top: 20px;
    width: 550px;
  }
}

@media only screen and (min-width: 845px) {
  .numbers {
    font-size: 40px;
  }
}

@media only screen and (min-width: 960px) {
  .video-section {
    display:inline-block;
    margin: 50px 0px;
  }
  .video-header {
    float:left;
    width:350px;
  }
  .video-header p {
    text-align:left;
  }
  .video-container {
    float:right;
    width: 500px;
    height: 200px;
    padding:90px 0px 0px 20px;
  }

}

@media only screen and (min-width: 1200px) {

}
</style>

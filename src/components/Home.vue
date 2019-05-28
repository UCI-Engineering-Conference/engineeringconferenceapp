<template>
  <div>
    <div v-if="isRecruitmentOpen" class="recruitment-banner">
      <h3 style="margin:0;">Engineering Conference is now recruiting for Fall 2019!</h3>
      <router-link to="/jointheteam" tag="button" style="width:150px;height:40px;font-size:20px;" class="submit-button recruitment-button"><span>APPLY NOW</span></router-link>
    </div>
    <div class="main-video">
      <iframe class="resp-iframe" src="https://www.youtube.com/embed/OdiwpVA75T8?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
    <img class="main-image" src="/static/img/EC_logo_v3_text.png"/>
    <div class="intro">
      <h1 class="intro-line1">Innovate. Lead. Debate.</h1>
      <p class="intro-line3">{{ generalContent.Date }}</p>
    </div>

    <div v-if="isApplicationOpen">
      <router-link to="/application" tag="button" style="margin:30px;width:200px;height:50px;font-size:24px;" class="submit-button"><span>APPLY NOW</span></router-link>
    </div>
    <div v-if="isApplicationClosed">
      <p>Tickets for Engineering Conference {{generalContent.Year}} are officially</p>
      <h1 class="sold-out">Sold Out!</h1>
    </div>
    <div>
      <p>Join our community to be the first to know about important updates.</p>
      <button
        type="button"
        class="submit-button"
        @click="showModal"
      ><span>Get Connected</span>
      </button>
    </div>

    <modal
      v-show="isModalVisible"
      @close="closeModal"
    />

    <div class="numbers">
      <p class="numbers1"><b>{{generalContent.Attended}}</b> <br>Engineers</p>
      <p class="numbers2"><b>{{generalContent.Days}}</b> <br>Days</p>
      <p class="numbers3"><b>{{generalContent.Published}}</b> <br>Published</p>
    </div>

    <div class="video-section">
      <div class="video-header">
        <h2>UC Irvine's Engineering Conference is back</h2>
        <p>Gather with hundreds of students of all backgrounds to research and design solutions for engineering problems. Let us take care of the food, resources, energy, and entertainment so you can focus on the innovation.</p>
        <p>UCI Engineering Conference is an undergraduate student-run conference that pushes
          engineers to utilize the knowledge in their fields of interest to solve real world engineering
          problems as they improve their public speaking and debate skills. </p>
      </div>
      <!--<div class="video-container">-->
        <!--<iframe class="resp-iframe" src="https://www.youtube.com/embed/yCOshvp6BV0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>-->
      <!--</div>-->
    </div>

    <div class="img-strip-wrapper">
      <ul class="img-strip">
        <li v-for="img in image_strip.delegates1" v-bind:key="img">
          <img :src="miscImgPreUrl(img)">
        </li>
      </ul>
    </div>

    <div class="philanthropy">
      <h2 class="lined-header">Our Mission</h2>
      <p><i>{{ generalContent.Mission }}</i> </p>
      <h2 class="lined-header">Our Vision</h2>
      <p><i>{{ generalContent.Vision }}</i> </p>
      <h2 class="lined-header">Philanthropy</h2>
      <p>Imagine what would happen if the money you spent on Engineering Conference was used to build projects that helped the planet?</p>
      <p>Well, it does. And not just some of it, all of it. In the past we've raised over enough money to give over six full one-year scholarships to students in developing countries through UMR, in addition to support building a distribution system in Maventibao, Madagascar that makes water more accessible for the people who live there. Engineers in our organization are <b>BIG</b> on philanthropy and we pick the projects that prove it. <!--<a @click="showModal">Sign up for our news letter</a> to come with us on projects like <a href="http://corazon.org/en/the-programs/the-corazon-experience">Corazon Builds.</a>--> </p>
    </div>

    <div class="published-papers">
      <h2 class="lined-header">Papers</h2>
      <p>Congratulations to the winners of Engineering Conference 2019, who were awarded a guaranteed publication and a Boeing El Segundo Satellite Facility tour. To find out more and view the other publications click <router-link to="/papersandprojects">Here</router-link>.</p>
      <div class="pub">
        <img class="pub-image" :src="miscImgPreUrl(papersAndProjects.Publications[0].img)"/>
        <a class="pub-title" :href="papersAndProjects.Publications[0].link">{{papersAndProjects.Publications[0].name}}</a>
        <div class="pub-description">{{papersAndProjects.Publications[0].desc}}...</div>
      </div>
    </div>
    <div class="projects">
      <h2 class="lined-header">Projects</h2>
      <p>Dream of designing large scale, cutting edge, multidisciplinary engineering projects? </p>
      <p>Every year the delegates of Engineering Conference, with the help of our dedicated Chairs Board, research in-depth solutions to the technical problems facing the modern world. In the past we've researched, designed, and debated Smart-Buildings and the next generation of Agriculture. Get more details about past projects <router-link to="/papersandprojects">Here</router-link>.</p>
    </div>

    <div class="recruitment2">
      <h2 class="lined-header">Interested in joining our team?</h2>
      <p>Are you <b>creative</b>, <b>dedicated</b>, and want to have a <b>global impact</b>?</p>
      <p>UCI Engineering Conference wants students like you!</p>
      <p>Click <router-link to="/jointheteam">Here</router-link> to see what positions are available.</p>
    </div>
    <div class="img-strip-wrapper">
      <ul class="img-strip">
        <li v-for="img in image_strip.chairs" v-bind:key="img">
          <img :src="miscImgPreUrl(img)">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import modal from './MailingListModal.vue'
import generalContent from '../../static/GeneralContent.json'
import papersAndProjects from '../../static/PapersandProjects.json'
import ImageStrip from '../../static/ImageStrips.json'
export default {
  components: {
    modal
  },
  computed: {
    isApplicationOpen () {
      return this.$store.state.applicationOpen
    },
    isApplicationClosed () {
      return this.$store.state.applicationClosed
    },
    isRecruitmentOpen () {
      return this.$store.state.recruitmentOpen
    }
  },
  data () {
    return {
      isModalVisible: false,
      generalContent: generalContent,
      papersAndProjects: papersAndProjects,
      imgLocation: '/static/faqpics/',
      miscImgLoc: '/static/misc-pics/',
      image_strip: ImageStrip
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
    },
    miscImgPreUrl (img) {
      return this.miscImgLoc.concat(img)
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
.recruitment-banner {
  background-color: var(--green-color);
  color: var(--white-color);
  padding: 4px;
  overflow: hidden;
}
.intro-line1, .intro-line2, .intro-line3 {
  padding:0;
  margin:0;
  color: var(--black-color);
}
.intro-line1 {
  color: var(--green-color);
}
.intro-line3 {
  text-transform: uppercase;
  font-weight: 400;
  color: var(--light-black-color);
}
.sold-out {
  text-transform: uppercase;
  font-weight: 900;
  font-size: 50px;
  color: var(--error-color);
}
.numbers {
  margin: 20px auto;
  font-size: 5vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  padding: 10px;
  color: var(--white-color);
  font-weight: 300;
}
.numbers1 {
  padding: 60px 0 30px 0;
  margin: 0;
  border-right: 2px solid var(--white-color);
  background: rgba(24, 24, 24, 0.9) url("/static/misc-pics/delegate6.jpg") no-repeat;
  background-size: 100%;
  background-blend-mode: darken;
}
.numbers2 {
  padding: 60px 0 30px 0;
  margin: 0;
  background: rgba(40, 82, 36, 0.9) url("/static/misc-pics/delegate7.jpg") no-repeat;
  background-size: 100%;
  background-blend-mode: darken;
}
.numbers3 {
  padding: 60px 0 30px 0;
  margin: 0;
  border-left: 2px solid var(--white-color);
  background: rgba(24, 24, 24, 0.9) url("/static/misc-pics/delegate5.jpg") no-repeat;
  background-size: 100%;
  background-blend-mode: darken;
}
.video-section {
  overflow:hidden;
  margin: 40px;
}
.video-header {
  padding: 0 20px 0 20px;
}
.video-container {
  position: relative;
  overflow:hidden;
  padding-top: 56.25%;
}
.main-video {
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
  background-color: var(--light-black-color);
  color: var(--white-color);
  overflow: hidden;
  font-size: 9px;
}
.recruitment p {
  padding: 0;
  margin: 2px;
}
a {
  cursor: pointer;
  text-decoration: none;
  color: var(--green-color);
}
a:hover {
  text-decoration: underline;
}
.philanthropy, .recruitment2 {
  margin: 20px 10%;
}
.philanthropy-img {
  max-width: 80%;
  transform: scaleY(-1) scaleX(-1);
  border: 5px solid var(--black-color);
  border-radius: .5em;
}

.pub-title {
  font-size: 16px;
}
.pub-description {
  font-size: 11px;
  padding: 6px 10px 16px 10px;
  color: var(--white-color);
  background: rgba(60, 60, 60, 0.8) url("/static/img/ecgraphic.png") no-repeat center;
  background-size: 90%;
  background-blend-mode: darken;
}
.pub-image {
  height: 180px;
  border: 2px solid var(--light-black-color);
}
.pub {
  width: 280px;
  padding: 8px 5px 0 5px;
  justify-content: center;
  border: 2px solid var(--light-black-color);
  border-radius: 2px;
  background-color: var(--black-color);
  margin: 20px auto;
}

@media only screen and (min-width: 350px) {
  .numbers1 {
    padding: 70px 0 40px 0;
  }
  .numbers2 {
    padding: 70px 0 40px 0;
  }
  .numbers3 {
    padding: 70px 0 40px 0;
  }
}

@media only screen and (min-width: 420px) {
  .recruitment {
    font-size: 13px;
  }
  .projects, .published-papers {
    margin: 20px 10%;
  }
}

@media only screen and (min-width: 640px) {
  .main-image {
    padding-top: 20px;
    width: 550px;
  }
  .recruitment {
    font-size: 18px;
  }
  .numbers {
    font-size: 40px;
  }
  .numbers1 {
    padding: 100px 0 80px 0;
  }
  .numbers2 {
    padding: 100px 0 80px 0;
  }
  .numbers3 {
    padding: 100px 0 80px 0;
  }
}

@media only screen and (min-width: 845px) {
  .numbers {
    font-size: 60px;
  }
  .numbers1 {
    padding: 140px 0 90px 0;
  }
  .numbers2 {
    padding: 140px 0 90px 0;
  }
  .numbers3 {
    padding: 140px 0 90px 0;
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

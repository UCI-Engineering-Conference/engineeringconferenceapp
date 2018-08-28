<template>
  <div>
    <img style="width: 550px;" src="/static/img/thumbnail.png"/>
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
      <p><b>169</b> Engineers.</p>
      <p><b>3</b> Days.</p>
      <p><b>37</b> Students Published.</p>
    </div>

    <div style="overflow:hidden;display:inline-block;">
      <div style="float:left;width:350px;padding:20px;">
        <h2>UC Irvine's Engineering Conference is back</h2>
        <p style="text-align: left;">Gather with hundreds of engineering students of all backgrounds to research and design for solutions for contemporary problems.</p>
        <p style="text-align: left;">{{content.Mission}} Let us take care of the food, resources, energy, and entertainment so you can focus on the engineering.</p>
      </div>
      <div style="float:right; padding:90px 0px 0px 20px;">
        <iframe width="400" height="225" src="https://www.youtube.com/embed/5EDrelKmgy4" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen />
      </div>
    </div>

    <div class="published-papers">
      <div>
        <a href="https://escholarship.org/uc/item/5qb1r7tv">SolarFlair</a>
      </div>
      <div>
        <a href="https://escholarship.org/uc/item/5rc1q3xr">Connect the Zots</a>
      </div>
    </div>

    <section>
      <h2>Interested in joining our team?</h2>
      <p>Are you <b>creative</b>, <b>dedicated</b>, and want to have a <b>global impact</b>?</p>
      <p>UCI Engineering Conference wants students like you!</p>
      <p>Click <router-link to="/jointheteam">Here</router-link> to see what positions are available.</p>
    </section>

    </div>
</template>

<script>
import modal from './MailingListModal.vue'
import homePageContent from '../../static/HomePageContent.json'
export default {
  components: {
    modal
  },
  data () {
    return {
      isModalVisible: false,
      isApplicationOpen: true,
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
.intro-line1, .intro-line2, .intro-line3 {
  padding:0;
  margin:0;
  color: #3D3D3D;
}
.intro-line1 {
  color: #FFC61C;
}
.intro-line3 {
  text-transform: uppercase;
  font-weight: 400;
  color: #606060;
}
.numbers {
  display: table;
  margin: 20px auto;
  font-size: 3vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: #65D25C;
  padding: 15px;
  color: #FFFFFF;
  font-weight: 300;
}
</style>

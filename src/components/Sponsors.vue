<template>
  <div>
    <div class="page-header">
      <p>Sponsors</p>
    </div>

    <div class="sponsors">
      <ul class="sponsor-grid">
        <li v-for="(sponsor, index) in sponsor_data['general']" v-bind:key="index">
          <img class="sponsor-image" :src="imgPreUrl(sponsor)">
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
import Sponsors from '../../static/Sponsors.json'
export default {
  data () {
    return {
      imgLocation: '/static/sponsors/',
      sponsor_data: Sponsors
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
  .sponsor-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 40px;
  }
  .page-header {
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url(/static/page-headers/sponsors.jpg);
  }
  @media only screen and (min-width: 740px) {
    .sponsor-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media only screen and (min-width: 1200px) {
    .sponsor-grid {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>

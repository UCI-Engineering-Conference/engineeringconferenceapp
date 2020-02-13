<template>
<section>
  <section class="sponsors section bg-sponsors overlay-white">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="section-title">
            <h3>Our <span class="alternate">Sponsors</span></h3>
            <p>Without Sponsors, UCI Engineering Conference wouldn't be possible. We deeply appreciate our Sponsors.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div style="padding: 20px 10vw 20px 10vw;">
  <img src="../../static/img/Sponsors_2019-2020_enhanced.jpg" height="90%" width="100%">
  </div>
  </section>
</template>

<script>
import Sponsors from '../../static/Sponsors.json'
export default {
  data () {
    return {
      previous_year: Sponsors[0].companies,
      this_year: Sponsors[1].companies,
      img_location_2019: '../../static/sponsors/'
    }
  },
  methods: {
    imgURL (img) {
      console.log(this.img_location_2019.concat(img))
      return this.img_location_2019.concat(img)
    }
  }
}
</script>

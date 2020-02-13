<template>
  <div>
    <!--===========================Banner-->
<!--    <div>-->
<!--      <img src="../../static/img/homepage_banner.png" height="100%" width="100%">-->
<!--    </div>-->

    <div class="container m-auto text-center">
      <img src="../../static/img/sold_out.png" height="70%" width="70%">
    </div>

    <!--===========================Ticket Banner-->

    <TicketBanner></TicketBanner>

    <!--===========================Mini Gallery-->

    <MiniGallery></MiniGallery>

    <!--===========================Introduction-->

    <Introduction></Introduction>

    <!--===========================About-->

    <About></About>

    <!--===========================Sponsors-->

    <Sponsors></Sponsors>

    <!--===========================Highlights-->

    <Highlights></Highlights>

    <!--===========================Map-->

    <Map></Map>

  </div>
</template>

<style>
  @import '../../static/style.css';
</style>

<script>
import TicketBanner from './TicketBanner.vue'
import Introduction from './Introduction.vue'
import MiniGallery from './MiniGallery.vue'
import Schedule from './Schedule.vue'
import About from './About.vue'
import Highlights from './Highlights.vue'
import Sponsors from './Sponsors.vue'
import Map from './Map.vue'

export default {
  components: {
    'TicketBanner': TicketBanner,
    'Introduction': Introduction,
    'MiniGallery': MiniGallery,
    'Schedule': Schedule,
    'About': About,
    'Highlights': Highlights,
    'Sponsors': Sponsors,
    'Map': Map
  }
}
</script>

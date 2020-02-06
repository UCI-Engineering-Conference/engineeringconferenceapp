<template>
  <div>
    <!--===========================Banner-->
    <div>
      <img src="../../static/img/new-banner.png" height="100%" width="100%">
    </div>

    <!--===========================Ticket Banner-->

    <TicketBanner></TicketBanner>

    <!--===========================Introduction-->

    <Introduction></Introduction>

    <!--===========================About-->

    <About></About>

    <!--===========================Highlights-->

    <Highlights></Highlights>

    <!--===========================Sponsors-->

    <Sponsors></Sponsors>

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
import About from './About.vue'
import Highlights from './Highlights.vue'
import Sponsors from './Sponsors.vue'
import Map from './Map.vue'

export default {
  components: {
    'TicketBanner': TicketBanner,
    'Introduction': Introduction,
    'About': About,
    'Highlights': Highlights,
    'Sponsors': Sponsors,
    'Map': Map
  }
}
</script>

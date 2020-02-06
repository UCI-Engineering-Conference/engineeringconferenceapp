<template>
  <section class="map">
    <!-- Google Map -->
    <div id="map">
      <iframe width="100%" height="100%" id="gmap_canvas" src="https://maps.google.com/maps?q=University%20of%20California%2C%20Irvine%20Division%20of%20Continuing%20Education%2C%20510%20E%20Peltason%20Dr%2C%20Irvine%2C%20CA%2092697&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="yes" marginheight="0" marginwidth="0">
      </iframe>
    </div>
    <div class="address-block">
      <p class="lead" style="color: white;">Division of Continuing Education</p>
      <ul class="address-list p-0 m-0">
        <li><i class="fa fa-home"></i><span>510 E Peltason Dr <br>Irvine, CA 92697</span></li>
        <li><i class="fa fa-phone"></i><span>(949) 824-5414</span></li>
      </ul>
      <form action="http://maps.google.com/maps" method="get" target="_blank">
        <input type="hidden" name="daddr" value="University of California, Irvine Division of Continuing Education, 510 E Peltason Dr, Irvine, CA 92697" />
        <input type="submit" value="Get Directions"  class="btn btn-white-md"/>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Map'
}
</script>

<style scoped>

</style>

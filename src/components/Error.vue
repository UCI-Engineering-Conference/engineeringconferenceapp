<template>
  <section>
    <div class="pricing-header px-3 py-3 pb-md-4 mx-auto text-center mb-3">
      <h2 class="display-4 mb-3">Whoops Payment Not Processed 😯</h2>
      <div class="container">
        <ul style="margin-bottom: 70px;" class="px-0">
          <li>• Unstable Internet Connection</li>
          <li>• Previously Purchased Ticket with Specific Email</li>
          <li>• Card Declined</li>
        </ul>
      </div>
      <p class="lead"><router-link to="/application"><b-button>Try Again</b-button></router-link> or <router-link to="/contact"><b-button>Contact Us</b-button></router-link></p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Error'
}
</script>

<style>
  @import '../../static/style.css';
</style>

<style scoped>
ul li {
  list-style-type: none;
}
</style>

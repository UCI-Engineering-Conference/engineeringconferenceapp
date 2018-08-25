<template>
  <div id="app">
    <span class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/meettheteam">Meet the Team</router-link>
      <router-link to="/schedule">Schedule</router-link>
      <router-link to="/sponsors">Sponsors</router-link>
    </span>
    <router-view/>
    <footer class="footer">
      <hr />
      <router-link to="/contact">Contact Us</router-link>
      <router-link to="/jointheteam">Become Part of EC</router-link>
      <br>
      <a href="mailto:EngineeringConferenceUCI@gmail.com"><font-awesome-icon icon="envelope" /></a>
      <a href="https://www.facebook.com/EConferenceUCI"><font-awesome-icon :icon="['fab', 'facebook']" /></a>
      <a href="https://twitter.com/@EConferenceUCI"><font-awesome-icon :icon="['fab', 'twitter']" /></a>
      <a href="https://instagram.com/EConferenceUCI"><font-awesome-icon :icon="['fab', 'instagram']" /></a>
      <p>&copy;UCI Engineering Conference</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  background: transparent;
}
ul {
  list-style: none;
}
</style>

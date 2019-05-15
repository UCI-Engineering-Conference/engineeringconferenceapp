<template>
  <div id="app">
    <div id="nav">
      <router-link class="nav-logo" to="/"><img src="/static/img/thumbnail.png"/></router-link>
      <div class="nav-link">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/meettheteam">Meet the Team</router-link>
        <router-link to="/schedule">Schedule</router-link>
        <router-link to="/sponsors">Partners</router-link>
        <router-link to="/gallery">Gallery</router-link>
      </div>
    </div>
    <router-view/>
    <modal v-show="isModalVisible" @close="closeModal">
      <h2 slot="header">Amazing!</h2>
      <p slot ="body">You're official registered for UCI Engineering Conference! We'll be in touch with you soon regarding the status of your application.</p>
    </modal>
    <footer id="footer">
      <div class="footer-icon">
        <a href="mailto:EngineeringConferenceUCI@gmail.com"><font-awesome-icon icon="envelope" /></a>
        <a href="https://www.facebook.com/EConferenceUCI"><font-awesome-icon :icon="['fab', 'facebook']" /></a>
        <a href="https://twitter.com/@EConferenceUCI"><font-awesome-icon :icon="['fab', 'twitter']" /></a>
        <a href="https://instagram.com/EConferenceUCI"><font-awesome-icon :icon="['fab', 'instagram']" /></a>
      </div>
      <div class="footer-link">
        <div class="footer-apply-link" v-if="isApplicationOpen">
          <router-link to="/application">Apply Now</router-link>
        </div>
        <div class="other-footer-links">
          <router-link to="/contact">Contact Us</router-link>
          <router-link to="/papersandprojects">Papers</router-link>
          <router-link to="/papersandprojects">Projects</router-link>
          <router-link to="/jointheteam">Join the Team</router-link>
        </div>
      </div>
      <!--TODO: Delete SecretPageModal-->
      <p>&copy;UCI Engineering Conference</p>
    </footer>
  </div>
</template>

<script>
import VeeValidate from 'vee-validate'
import modal from './components/SecretPageModal.vue'
export default {
  name: 'App',
  components: {
    modal
  },
  computed: {
    isApplicationOpen () {
      return this.$store.state.applicationOpen
    }
  },
  created: function () {
    VeeValidate.Validator.extend('is_uci_email', {
      // Custom validation message
      getMessage: (field) => `The ${field} must be an @uci.edu email.`,
      // Custom validation rule
      validate: (value) => new Promise(resolve => {
        const reg = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(uci)\.edu$/i
        resolve({
          valid: value && reg.test(value)
        })
      })
    })
    // TODO: is_open_committee currently not being used
    VeeValidate.Validator.extend('is_open_committee', {
      // Custom validation message
      getMessage: (field) => `The tickets for this ${field} have been sold out.`,
      // Custom validation rule
      validate: (value) => new Promise(resolve => {
        // TODO: Add Committee Restrictions
        let closedCommittees = []
        resolve({
          valid: !(closedCommittees.indexOf(value) > -1)
        })
      })
    })
  },
  data () {
    return {
      isModalVisible: false
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

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700');
  :root {
    --page-header-bg: 0.3;
    --light-black-color: #606060;
    --black-color: #3d3d3d;
    --green-color: #65D25C;
    --light-green-color: #A2E49D;
    --white-color: #FFFFFF;
    --error-color: #fa755a;
  }
  #app {
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--black-color);
  background-color: var(--white-color);
}
#nav {
  position: sticky;
  top:0;
  left:0;
  height: 60px;
  width: auto;
  padding-bottom: 10px;
  box-shadow: 0 6px 7px -7px rgba(0,0,0,.6);
  text-align: right;
  background-color: var(--white-color);
  z-index: 10;
}

button {
  background: transparent;
}
select {
  -moz-appearance: none;
  -webkit-appearance: none;
}
ul {
  list-style: none;
  padding: 0;
}
.alert {
  color: var(--error-color);
}

#nav .nav-link a {
  text-decoration: none;
  font-size: 2.9vw;
  font-weight: 400;
  padding: 2px;
  color: var(--black-color);
  position:relative;
  top: 30px;
}
#nav .nav-link a:hover {
  cursor: pointer;
  border-bottom: 3px solid rgba(101, 210, 92, .7);
}
#nav .nav-link .router-link-exact-active {
  border-bottom: 3px solid var(--green-color);
}
#nav .nav-logo img {
  float: left;
  height: 50px;
}
#footer {
  background-color: var(--black-color);
  padding: 20px;
  color: var(--white-color);
}
#footer a {
  cursor: pointer;
  text-decoration: none;
  font-size: 2em;
  padding: 6px;
  color: var(--white-color);
  -webkit-transition: all 500ms ease;
  -moz-transition: all 500ms ease;
  -o-transition: all 500ms ease;
  transition: all 500ms ease;
}

.footer-icon {
  padding: 8px;
}
#footer .footer-link .other-footer-links a{
  font-size: 3.2vw;
  padding: 8px;
}
#footer .footer-link .footer-apply-link a {
  font-size: 4.8vw;
  font-weight: 900;
}
#footer a:hover {
  color: var(--green-color);
}
.submit-button {
  display: inline-block;
  border-radius: 20px;
  background-color: var(--light-green-color);
  border: none;
  border-bottom: 3px solid var(--green-color);
  color: var(--white-color);
  text-align: center;
  font-size: 22px;
  padding: 4px;
  width: 200px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.submit-button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.submit-button span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.submit-button:hover span {
  padding-right: 25px;
}

.submit-button:hover span:after {
  opacity: 1;
  right: 0;
}

.recruitment-button {
  background-color: var(--white-color);
  border-bottom: 1px solid var(--green-color);
  color: var(--green-color);
  border-radius: 5px;
}
.page-header {
  color: var(--white-color);
  font-weight: 300;
  font-size: 20px;
  background: no-repeat center center;
  background-size: cover;
  padding: 30px;
  margin-bottom: 20px;
}
  .img-strip {
    display: flex;
    justify-content: center;

  }
  .img-strip li {
    flex-basis: 200px;
  }
  .img-strip li img {
    background-color: var(--black-color);
    padding: 1px;
    width: 40px;
  }
  .img-strip li:nth-child(even) img {
    background-color: var(--green-color);
  }
  .lined-header {
    display: grid;
    grid-template-columns: minmax(20px, 1fr) auto minmax(20px, 1fr);
    align-items: center;
    text-align: center;
    grid-gap: 20px;
    width: 100%;
  }
  .lined-header:before,
  .lined-header:after {
    content: '';
    color: var(--black-color);
    border-top: 2px solid;
  }

  @media only screen and (min-width: 350px) {
    .img-strip li img{
      padding: 2px;
      width: 50px;
    }
  }
  @media only screen and (min-width: 420px) {
    #nav .nav-link a {
      font-size: 3vw;
      padding: 3px;
    }
    #nav .nav-link a:hover {
      border-bottom: 5px solid rgba(101, 210, 92, .7);
    }
    #nav .nav-link .router-link-exact-active {
      border-bottom: 5px solid var(--green-color);
    }
    #footer .footer-icon a {
      font-size: 2.8em;
      padding: 12px;
    }

    .page-header {
      font-size: 30px;
      padding: 100px;
      margin-bottom: 50px;
    }
  }

  @media only screen and (min-width: 540px) {
    .img-strip li img{
      width:80px;
    }
  }
  @media only screen and (min-width: 600px) {
    #footer .footer-link .other-footer-links a {
       font-size: 18px;
     }
    #footer .footer-link .footer-apply-link a {
      font-size: 32px;
    }
    #nav .nav-link a {
      font-size: 18px;
      padding: 8px;
      top: 60px;
    }
    #nav .nav-logo img {
      height:100px;
    }
    #nav {
      height: 100px;
    }
  }
  @media only screen and (min-width: 820px) {
    .img-strip li img{
      width:120px;
    }
  }

</style>

<template>
  <div id="app">
    <div class="fixed-navbar nav">
      <b-navbar toggleable="lg" type="light fixed-top" variant="white">
        <b-navbar-brand><img src="../static/img/thumbnail.png" alt="logo" class="home-logo"></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav id="menu">
            <b-nav-item>
              <router-link to="/" class="nav-link" id="nav-link-1">Home</router-link>
            </b-nav-item>
            <b-nav-item>
              <div >
                <router-link to="/schedule" class="nav-link" id="nav-link-2">Schedule</router-link>
              </div>
            </b-nav-item>
            <b-nav-item>
              <div >
                <router-link to="/faq" class="nav-link" id="nav-link-3">FAQ</router-link>
              </div>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/ourteam" class="nav-link">Our Team</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/contact" class="nav-link">Contact</router-link>
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <router-link to="/application"><b-button squared variant="light" size="md" style="border: 2px solid #65d25c; color: black">Apply Now</b-button></router-link>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view/>
<!--        <b-navbar type="light fixed-bottom">-->
<!--          <b-navbar-nav class="ml-auto">-->
<!--            <button class="btn btn-main-md" type="submit">Feb 25-27</button>-->
<!--          </b-navbar-nav>-->
<!--        </b-navbar>-->
    <footer id="footer">
      <p class="text-center">&copy;UCIEngineeringConference2020</p>
    </footer>
  </div>
</template>

<script>
import modal from './components/SecretPageModal.vue'
require('vue-flash-message/dist/vue-flash-message.min.css')

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

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700');
  :root {
    --page-header-bg: 0.3;
    --light-black-color: #606060;
    --black-color: #3d3d3d;
    --green-color: #65D25C;
    --light-green-color: #A2E49D;
    --white-color: #FFFFFF;
    --error-color: #fa755a;
    --light-error-color: #ffac9c;
  }
/*  #app {*/
/*  font-family: 'Source Sans Pro', sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: var(--black-color);*/
/*  background-color: var(--white-color);*/
/*}*/
#navi {
  position: sticky;
  top:0;
  left:0;
  height: 50px;
  width: auto;
  padding-bottom: 20px;
  box-shadow: 0 6px 7px -7px rgba(0,0,0,.6);
  text-align: right;
  background-color: #ffffff;
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

#navi .navi-link a {
  text-decoration: none;
  font-size: 2.9vw;
  font-weight: 400;
  padding: 2px;
  color: #808080;
  position:relative;
  top: 20px;
}
#navi .navi-link a:hover {
  cursor: pointer;
  border-bottom: 3px solid rgba(101, 210, 92, .7);
}
#navi .navi-link .router-link-exact-active {
  border-bottom: 3px solid var(--green-color);
}
#navi .navi-logo img {
  float: left;
  height: 40px;
  margin-top: 10px;
  margin-left: 10px;
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
    #navi .navi-link a {
      font-size: 3vw;
      padding: 3px;
    }
    #navi .navi-link a:hover {
      border-bottom: 5px solid rgba(101, 210, 92, .7);
    }
    #navi .navi-link .router-link-exact-active {
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
    #navi .navi-link a {
      font-size: 18px;
      padding: 8px;
      top: 64px;
    }
    #navi .navi-logo img {
      height:80px;
      margin-top: 10px;
      margin-left: 10px;
    }
    #navi {
      height: 100px;
    }
  }
  @media only screen and (min-width: 820px) {
    .img-strip li img{
      width:120px;
    }
  }

</style>

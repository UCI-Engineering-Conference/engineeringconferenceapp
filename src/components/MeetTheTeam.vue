<template>
<div class="wrapper">
  <div class="page-header">
    <p>Meet the Team</p>
  </div>
  <div>
    <button class="arrow-left" @click="switchYear(1)"></button>
    <h4>{{ displayYear }}</h4>
    <button class="arrow-right" @click="switchYear(-1)"></button>
  </div>
  <div class="team-wrapper">
    <transition name="slide-fade" mode="out-in">
      <div class="container" v-bind:key="currentYear">
        <div class="team">
          <div class="management">
            <ul class="management-grid">
              <li v-for="(member, index) in member_data[currentYear]['management']" v-bind:key="index">
                <div class="member">
                  <div class="member-bg">
                    <img class="member-image" :src="imgPreUrl(member.img)">
                    <div class="member-info">
                      <a class="member-name" :href="member.linkedIn">{{ member.name }}</a>
                      <div class="member-position">{{ member.position }}</div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="management-grid">
              <li v-for="(member, index) in member_data[currentYear]['others']" v-bind:key="index">
                <div class="member">
                  <div class="member-bg">
                    <img class="member-image" :src="imgPreUrl(member.img)">
                    <div class="member-info">
                      <a class="member-name" :href="member.linkedIn">{{ member.name }}</a>
                      <div class="member-position">{{ member.position }}</div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="chairs">
            <h2 class="lined-header">Chairs</h2>
            <ul class="chairs-grid">
              <li class="head-chair" v-if="member_data[currentYear]['head-chair']">
                <div class="member">
                  <div class="member-bg">
                    <img class="member-image" :src="imgPreUrl(member_data[currentYear]['head-chair'].img)">
                    <div class="member-info">
                      <a class="member-name" :href="member_data[currentYear]['head-chair'].linkedIn">{{ member_data[currentYear]['head-chair'].name }}</a>
                      <div class="member-position">{{ member_data[currentYear]['head-chair'].position }}</div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="chairs-grid">
              <li v-for="(member, index) in member_data[currentYear]['chairs']" v-bind:key="index">
                <div class="member">
                  <div class="member-bg">
                    <img class="member-image" :src="imgPreUrl(member.img)">
                    <div class="member-info">
                      <a class="member-name" :href="member.linkedIn">{{ member.name }}</a>
                      <div class="member-position">{{ member.position }}</div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <h2 class="lined-header">Advisers</h2>
          <div class="advisers">
            <ul class="advisers-grid">
              <li v-for="(member, index) in member_data[currentYear]['advisers']" v-bind:key="index">
                <div class="member">
                  <div class="member-bg">
                    <img class="member-image" :src="imgPreUrl(member.img)">
                    <div class="member-info">
                      <a class="member-name" :href="member.linkedIn">{{ member.name }}</a>
                      <div class="member-position">{{ member.position }}</div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <div class="img-strip-wrapper">
      <ul class="img-strip">
        <li v-for="img in image_strip.team" v-bind:key="img">
          <img :src="miscImgPreUrl(img)">
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import ECMembers from '../../static/ECMembers.json'
import ImageStrip from '../../static/ImageStrips.json'
export default {
  data () {
    return {
      imgLocation: '/static/memberpics/',
      miscImgLoc: '/static/misc-pics/',
      member_data: ECMembers,
      image_strip: ImageStrip,
      currentYear: 0,
      displayYear: ECMembers[0].year
    }
  },
  methods: {
    imgPreUrl (img) {
      return this.imgLocation.concat(img)
    },
    miscImgPreUrl (img) {
      return this.miscImgLoc.concat(img)
    },
    switchYear (inc) {
      if (this.currentYear + inc < 0) this.currentYear = this.member_data.length - 1
      else if (this.currentYear + inc >= this.member_data.length) this.currentYear = 0
      else this.currentYear += inc
      this.displayYear = this.member_data[this.currentYear].year
    }
  }
}
</script>

<style scoped>

  .member {
    margin: 10px;
    border-bottom: 4px solid var(--light-black-color);
    border-radius: 10px;
    background-color: var(--black-color);
  }
  .member-bg {
    border-radius: 10px;
    background: rgba(20, 20, 20, .6) url("/static/img/ecgraphic.png") no-repeat center;
    background-blend-mode: darken;
    background-size: 90%;
  }
  .member-image {
    width: 60px;
    height: 60px;
    margin: -26px 0px 0px 0px;
    border-radius: 50%;
    border: 3px solid var(--black-color);
  }
  .member-name {
    font-size: 8px;
    font-weight: 700;
    line-height: 20px;
    color: var(--white-color);
  }
  a {
    text-decoration: none;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
  }
  a:hover{
    color: var(--green-color);
  }
  .member-position {
    font-size: 5px;
    font-weight: 300;
    color: var(--white-color);
  }
  .chairs, .advisers, .management{
    margin: 0 auto;
  }
  .page-header {
    background-image:
      linear-gradient(rgba(0, 0, 0, var(--page-header-bg)), rgba(0, 0, 0, var(--page-header-bg))),
      url(/static/page-headers/meet-the-team.jpg);
  }
  .chairs-grid, .advisers-grid, .management-grid{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  ul li {
    flex-basis: 100px;
    margin: 10px 0;
  }
  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  .arrow-left, .arrow-right{
    cursor: pointer;
    margin: 10px;
    font-size: 30px;
    border: none;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
  }
  .arrow-right:hover, .arrow-left:hover{
    color:  var(--green-color);
  }
  .arrow-left:before {
    content: '\00ab';
  }
  .arrow-right:before {
    content: '\00bb';
  }
  h4, button {
    display:inline-block;
    vertical-align: middle;
  }
  button {
    padding: 10px;
  }

  @media only screen and (min-width: 420px) {
    .member {
      border-bottom: 10px solid var(--light-black-color);
    }
    .member-image {
      width: 150px;
      height: 150px;
    }
    .member-name {
      font-size: 26px;
      line-height: 70px;
    }
    .member-position {
      font-size: 18px;
    }
    ul li {
      flex-basis: 300px;
    }
  }
  @media only screen and (min-width: 820px) {
    ul li {
      flex-basis: 350px;
    }
  }
</style>

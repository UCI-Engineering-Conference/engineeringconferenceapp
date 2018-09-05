<template>
<div class="wrapper">
  <div class="page-header">
    <p>Meet the Team</p>
  </div>

  <div>
    <div class="president">
      <ul>
        <li v-for="(member, index) in member_data['management']" v-bind:key="index">
          <div class="member">
            <img class="member-image" :src="imgPreUrl(member.img)">
            <div class="member-info">
              <a class="member-name" :href="member.linkedIn">{{ member.name }}</a>
              <div class="member-position">{{ member.position }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="others">
      <ul class="others-grid">
        <li v-for="(member, index) in member_data['others']" v-bind:key="index">
          <div class="member">
            <img class="member-image" :src="imgPreUrl(member.img)">
            <div class="member-info">
              <a class="member-name" :href="member.linkedIn">{{ member.name }}</a>
              <div class="member-position">{{ member.position }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <h2>Chairs Board</h2>
    <div class="head-chair">
      <div class="member">
        <img class="member-image" :src="imgPreUrl(member_data['head-chair'].img)">
        <div class="member-info">
          <a class="member-name" :href="member_data['head-chair'].linkedIn">{{ member_data['head-chair'].name }}</a>
          <div class="member-position">{{ member_data['head-chair'].position }}</div>
        </div>
      </div>
    </div>
    <div class="chairs">
      <ul class="chairs-grid">
        <li v-for="(member, index) in member_data['chairs']" v-bind:key="index">
          <div class="member">
            <img class="member-image" :src="imgPreUrl(member.img)">
            <div class="member-info">
              <a class="member-name" :href="member.linkedIn">{{ member.name }}</a>
              <div class="member-position">{{ member.position }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import ECMembers from '../../static/ECMembers.json'
export default {
  data () {
    return {
      imgLocation: '/static/memberpics/',
      member_data: ECMembers
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
  .president, .head-chair{
    margin: 0 auto;
    padding: 10px;
  }
  .member {
    margin: 10px;
    border-bottom: 4px solid #65D25C;
    background-color: #A2E49D;
    border-radius: 10px;
  }
  .member-image {
    width: 60px;
    height: 60px;
    margin: -26px 0px 0px 0px;
    border-radius: 50%;
    border: 3px solid #65D25C;
  }
  .member-name {
    font-size: 10px;
    font-weight: 700;
    line-height: 20px;
    color: #606060;
  }
  a{
    text-decoration: none;
    color: #606060;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
  }
  a:hover{
    color: #FFB511;;
  }
  .member-position {
    font-size: 5px;
    font-weight: 300;
    color: #606060;
  }

  .chairs {
    margin: 0 auto;
  }
  .page-header {
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url(/static/page-headers/meet-the-team.jpg);
  }
  .chairs-grid, .others-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  ul li {
    flex-basis: 100px;
    margin: 10px 0;
  }
  @media only screen and (min-width: 420px) {
    .member {
      border-bottom: 10px solid #65D25C;
    }
    .member-image {
      width: 150px;
      height: 150px;
      border: 5px solid #65D25C;
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
      margin: 10px 0;
    }
  }
  @media only screen and (min-width: 540px) {
    .president, .head-chair{
      width: 440px;
      margin: 0 auto;
      padding: 10px;
    }
  }
  @media only screen and (min-width: 820px) {
    ul li {
      flex-basis: 350px;
      margin: 10px 0;
    }
  }
</style>

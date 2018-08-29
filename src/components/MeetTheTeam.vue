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
    border-bottom: 10px solid #65D25C;
    background-color: #A2E49D;
    border-radius: 10px;
  }
  .member-image {
    width: 150px;
    height: 150px;
    margin: -26px 0px 0px 0px;
    border-radius: 50%;
    border: 5px solid #65D25C;
  }
  .member-name {
    font-size: 26px;
    font-weight: 700;
    line-height: 70px;
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
    color: #FFC61C;;
  }
  .member-position {
    font-size: 18px;
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
  .chairs-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 20px;
  }
  @media only screen and (min-width: 540px) {
    .chairs-grid {
      grid-template-columns: 1fr 1fr;
    }
    .president, .head-chair{
      width: 440px;
      margin: 0 auto;
      padding: 10px;
    }
  }
  @media only screen and (min-width: 820px) {
    .chairs-grid {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>

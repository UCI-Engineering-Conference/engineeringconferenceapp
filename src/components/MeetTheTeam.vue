<template>
<div class="wrapper">
  <h1>Meet the Team</h1>

  <div class="management">
    <ul>
      <li v-for="(member, index) in member_data['management']" v-bind:key="index">
        <span></span>
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
    <ul>
      <li v-for="(member, index) in member_data['chairs']" v-bind:key="index">
        <span></span>
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
  .management{
    margin: 0 auto;
    max-width: 400px;
    min-width: 400px;
    padding: 100px;
  }
  .management ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .head-chair{
    margin: 0 auto;
    max-width: 400px;
    min-width: 400px;
    padding: 50px;
  }
  .head-chair ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .member {
    margin: 10px;
    border-bottom: 10px solid #65D25C;
    background-color: #A2E49D;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
  .member-image {
    width: 150px;
    height: 150px;
    margin: -26px;
    border-radius: 50%;
    border: 5px solid #65D25C;
  }
  .member-info {

  }
  .member-name {
    font-size: 16px;
    font-weight: bold;
    line-height: 70px;
  }
  a{
    text-decoration: none;
    color: #000000;
  }
  a:hover{
    text-decoration: underline;
  }
  .member-position {
    font-size: 15px;
  }

  .chairs ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 1vh;
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>

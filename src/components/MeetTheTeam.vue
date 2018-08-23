<template>
<div class="wrapper">
  <h1>Meet the Team</h1>

  <div class="management">
    <ul>
      <li v-for="(member, index) in member_data['management']" v-bind:key="index">
        <span></span>
        <div class="management-member">
          <img class="management-image" :src="imgPreUrl(member.img)">
          <div class="management-info">
            <a class="management-name" :href="member.linkedIn">{{ member.name }}</a>
            <div class="management-position">{{ member.position }}</div>
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
    margin: 100px;
  }
  .management ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2vh;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .management-member {
    margin: 10px;
    border-bottom: 10px solid #65D25C;
    background-color: #A2E49D;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
  .management-image {
    width: 150px;
    height: 150px;
    margin: -26px;
    border-radius: 50%;
    border: 5px solid #65D25C;
  }
  .management-info {

  }
  .management-name {
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
  .management-position {
    font-size: 15px;
  }
</style>

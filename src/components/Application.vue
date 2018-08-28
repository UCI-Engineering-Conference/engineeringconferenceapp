<template>
  <div>
    <div class="page-header">
      <p>Engineering Conference Application</p>
    </div>
    lkjlk{{user.school}}{{user.major}}
    <div class="application">
      <h2>Apply Here!</h2>
      <div class="form-input">
        <div class="item-a">
          <label>First Name <b>*</b></label>
          <input type="text" v-model="user.firstname" v-validate="'required'" name="first name">
          <span class="alert">{{ errors.first('first name') }}</span>
        </div>
        <div class="item-b">
          <label>Last Name <b>*</b></label>
          <input type="text" v-model="user.lastname" v-validate="'required'" name="last name">
          <span class="alert">{{ errors.first('last name') }}</span>
        </div>
        <div class="item-c">
          <label>Email <b>*</b></label>
          <input type="text" v-model="user.email" v-validate="'required|email'" name="email">
          <span class="alert">{{ errors.first('email') }}</span>
        </div>
        <div class="item-d">
          <label>Phone</label>
          <input type="text" v-model="user.phone">
        </div>
        <div class="item-e">
          <label>School <b>*</b></label>
          <select v-model="user.school">
            <option disabled value="">Please select one</option>
            <option v-for="school in schools" :key="school">{{school}}</option>
          </select>
        </div>
        <div class="item-f">
          <label>Major <b>*</b></label>
          <div>
            <select v-model="user.major">
              <option disabled value="">Please select one</option>
              <option v-for="major in majors" :key="major">{{major}}</option>
            </select>
          </div>

        </div>
        <div class="item-g">
          <label>Graduation Year <b>*</b></label>
          <input type="text" v-model="user.graduationyear" v-validate="'required'" name="graduation year">
          <span class="alert">{{ errors.first('graduation year') }}</span>
        </div>
        <div class="item-h">
          <label>LinkedIn</label>
          <input type="text" v-model="user.linkedin">
        </div>

        <div class="item-i">
          <label class="message-label">Write a few lines about why you would be a good fit for EC and the position specified. Or specify multiple positions that you would be willing to take on!</label>
          <textarea type="text" v-model="user.message"></textarea>
        </div>
      </div>
      <button class="submit-button" @click="postJoin" style="vertical-align: middle"><span>Submit</span></button>
    </div>
  </div>
</template>

<script>
import SchoolandMajorInfo from '../../static/SchoolAndMajor.json'
import { db } from '../main'
export default {
  data () {
    return {
      schools: SchoolandMajorInfo['School'],
      majors: SchoolandMajorInfo['Major'],
      user: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        major: '',
        graduationyear: '',
        linkedin: '',
        school: '',
        message: ''
      }
    }
  },
  methods: {
    addUser () {
      this.user.createdAt = new Date()
      db.collection('applications').add(this.user)
    },
    postJoin () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.addUser()
          this.$emit('close')
        } else {
          console.log('Not valid')
        }
      })
    }
  },
  firestore () {
    return {
      users: db.collection('applications')
    }
  }
}
</script>

<style scoped>
  b {
    color: red;
  }
  input, label {
    display: block;
    margin: auto;
  }
  input, textarea, select {
    padding: 10px;
    border-radius: 5px;
    font-weight: 700;
    color: #606060;
    border: 2px solid #D3D3D3;
  }
  input {
    width: calc(100% - 40px);
    text-align: center;
  }
  textarea {
    width: 460px;
    height: 100px;
    resize: none;
    text-align: left;
  }
  select {
    width: calc(100% - 17px);
  }
  label {
    color: #606060;
    font-size: 20px;
    font-weight: 300;
    padding: 6px;
    text-align: left;
    margin-left: 20px;
  }
  .message-label {
    font-size: 16px;
  }
  .item-a {
    grid-area: item-a;
  }
  .item-b {
    grid-area: item-b;
  }
  .item-c {
    grid-area: item-c;
  }
  .item-d {
    grid-area: item-d;
  }
  .item-e {
    grid-area: item-e;
  }
  .item-f {
    grid-area: item-f;
  }
  .item-g {
    grid-area: item-g;
  }
  .item-h {
    grid-area: item-h;
  }
  .item-i {
    grid-area: item-i;
  }
  .submit-button {
    grid-area: item-j;
  }

  .form-input {
    display: grid;
    grid-template-columns: 250px 250px;
    grid-template-areas:
      "item-a item-b"
      "item-c item-c"
      "item-d item-d"
      "item-e item-e"
      "item-f item-g"
      "item-h item-h"
      "item-i item-i"
      "item-j item-j";
    justify-content: center;
  }

  .application {
    padding:40px;
    overflow: hidden;
  }
.page-header {
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(/static/page-headers/application.jpg);
}
</style>

<template>
<div>
  <div class="page-header">
    <p>Contact Us</p>
  </div>
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
      <label class="message-label">Write your message for Engineering Conference here. <b>*</b></label>
      <textarea type="text" v-model="user.message" v-validate="'required'" name="message"></textarea>
      <span class="alert">{{ errors.first('message') }}</span>
    </div>
  </div>
  <button class="submit-button" @click="postMessage"><span>Submit</span></button>
</div>
</template>

<script>
import { db } from '../main'
export default {
  data () {
    return {
      user: {
        firstname: '',
        lastname: '',
        email: '',
        message: '',
        createdAt: ''
      },
      users: []
    }
  },
  firestore () {
    return {
      users: db.collection('messages')
    }
  },
  methods: {
    addUser () {
      this.user.createdAt = new Date()
      db.collection('messages').add(this.user)
    },
    postMessage () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.addUser()
        } else {
          console.log('Not valid')
        }
      })
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
  input {
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    font-weight: 700;
    width: calc(100% - 40px);
    color: #606060;
    border: 2px solid #D3D3D3;
  }
  textarea {
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    font-weight: 700;
    color: #606060;
    width: 460px;
    height: 100px;
    resize: none;
    border: 2px solid #D3D3D3;
    text-align: left;
  }
  select {
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    font-weight: 700;
    color: #606060;
    width: calc(100% - 17px);
    border: 2px solid #D3D3D3;
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
  .form-input {
    display: grid;
    grid-template-columns: 250px 250px;
    grid-template-areas:
      "item-a item-b"
      "item-c item-c"
      "item-d item-d";
    justify-content: center;
  }
  .submit-button {
    margin-bottom: 40px;
  }
  .page-header {
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url(/static/page-headers/contact-us.jpg);
  }
</style>

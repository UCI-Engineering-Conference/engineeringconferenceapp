<template>
<div class="contact-page">
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
         <button :disabled="loading" class="submit-button" @click="handleSubmit"><pulse-loader size="10px" color="#FFF" :loading="loading"></pulse-loader><span v-if="!loading">Submit</span></button>
  </div>
</div>
</template>

<script>
import {FIREBASE_COLLECTIONS} from '../utils/constants'
const utils = require('../utils/utils')

const SUCCESS_MESSAGE = `Thank you for sending us your message. Our team will get back to you soon!`

export default {
  data () {
    return {
      user: {
      },
      loading: false
    }
  },
  methods: {
    async handleSubmit () {
      this.loading = true
      try {
        const {valid, message} = await this.validateInput()
        if (!valid) {
          this.flash(message, 'error', {timeout: 3000})
          console.log(message)
          this.loading = false
          return
        }
        this.user.createdAt = new Date().toLocaleString()
        const postData = {
          applicant: this.user,
          CONFIG: {
          },
          FIREBASE_COLLECTIONS
        }
        await utils.httpPost('contactMessage', postData)
        this.flash(SUCCESS_MESSAGE, 'success', {timeout: 3000})
        this.user = {}
      } catch (e) {
        if (e.response) {
          console.log(`Form submission failed: ${(e.response.data.invalid || e.response.data.error).msg}`)
          if (e.response.status === 400) {
            this.flash(e.response.data.invalid.msg, 'info', {timeout: 3000})
          } else {
            this.flash(e.response.data.error.msg, 'error', {timeout: 3000})
          }
        } else {
          console.log('Nothing recieved from server..')
          this.flash(`No response: ${e}`, 'error', {timeout: 3000})
        }
      } finally {
        this.loading = false
      }
    },
    async validateInput () {
      const validationResult = await this.$validator.validateAll()
      if (!validationResult) {
        return {valid: false, message: 'Missing Fields in Input'}
      }
      return {valid: true, message: ''}
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
    color: var(--black-color);
    border: 2px solid var(--black-color);
  }
  input {
    width: calc(100% - 40px);
    text-align: center;
  }
  textarea {
    width: 200px;
    height: 100px;
    resize: none;
    text-align: left;
  }
  select {
    width: calc(100% - 17px);
  }
  label {
    color: var(--white-color);
    font-size: 20px;
    font-weight: 300;
    padding: 6px;
    text-align: center;
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
  .submit-button {
    grid-area: item-e;
    border-radius: 5px;
    width: calc(100% - 10px);
    margin-top: 16px;
    margin-bottom: 40px;
  }

  .form-input {
    display: grid;
    grid-template-columns: 250px;
    grid-template-areas:
      "item-a"
      "item-b"
      "item-c"
      "item-d"
      "item-e";
    justify-content: center;
  }
  .contact-page {
    background-color: var(--light-black-color);
  }
  .page-header {
    background-image:
      linear-gradient(rgba(0, 0, 0, var(--page-header-bg)), rgba(0, 0, 0, var(--page-header-bg))),
      url(/static/page-headers/contact-us.jpg);
  }

@media only screen and (min-width: 520px) {
  .form-input {
    grid-template-columns: 250px 250px;
    grid-template-areas:
      "item-a item-b"
      "item-c item-c"
      "item-d item-d"
      "item-e item-e";
  }
  input {
    width: calc(100% - 40px);
  }
  textarea {
    width: 460px;
    height: 100px;
    text-align: left;
  }
  select {
    width: calc(100% - 17px);
  }
  label {
    text-align: left;
  }
  .message-label {
    font-size: 16px;
  }
}
</style>

<template>
  <div>
    <div class="page-header">
      <p>Want to be a part of UCI Engineering Conference?</p>
    </div>
    <div style="text-align:left;">
      <ul class="position-grid">
        <li v-for="(data, index) in positionInfo" :key="index">
          <div class="position">
            <div class="title">{{ data.title }}</div>
            <div class="description-title">{{ data.title }} Description </div>
            <div class="description"> {{ data.description }}</div>
            <div class="req-title">Qualifications</div>
            <ul class="requirements-list">
              <li v-for="(req, k) in data.requirements" :key="k">
                <div class="requirements">{{ req }}</div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>

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
          <input type="text" v-model="user.email" v-validate="'required|email|is_uci_email'" name="email">
          <span class="alert">{{ errors.first('email') }}</span>
        </div>
        <div class="item-d">
          <label>Phone <b>*</b></label>
          <input type="text" v-validate="'required'|{ regex: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/ }" v-model="user.phone" name="phone">
          <span class="alert">{{ errors.first('phone') }}</span>
        </div>
        <div class="item-e">
          <label>Major <b>*</b></label>
          <input type="text" v-model="user.major" v-validate="'required'" name="major">
          <span class="alert">{{ errors.first('major') }}</span>
        </div>
        <div class="item-f">
          <label>Class <b>*</b></label>
          <select v-model="user.class" v-validate="'required'" name="class">
            <option disabled value="">Please select one</option>
            <option v-for="cla in classes" :key="cla">{{cla}}</option>
          </select>
          <span class="alert">{{ errors.first('class') }}</span>
        </div>
        <div class="item-g">
          <label>LinkedIn</label>
          <input type="text" v-model="user.linkedin">
        </div>
        <div class="item-h">
          <label>Desired Position <b>*</b></label>
          <select v-model="user.position" v-validate="'required'" name="position">
            <option disabled value="">Please select one</option>
            <option v-for="(data, index) in positionInfo" :key="index">{{data.title}}</option>
          </select>
          <span class="alert">{{ errors.first('position') }}</span>
        </div>
        <div class="item-i">
          <label>Hrs/Week you can dedicate <b>*</b></label>
          <input type="text" v-model="user.hours" v-validate="'required|decimal'" name="hours">
          <span class="alert">{{ errors.first('hours') }}</span>
        </div>
        <div class="item-j" v-if="user.position === 'MEDIA'">
          <label>Media Position <b>*</b></label>
          <select v-model="user.subposition" v-validate="'required'" name="subposition">
            <option disabled value="">Please select one</option>
            <option v-for="(data, index) in positionInfo.MEDIA.subpositions" :key="index">{{data}}</option>
          </select>
          <span class="alert">{{ errors.first('subposition') }}</span>
        </div>
        <div class="item-k">
          <label class="message-label">Please elaborate on your interest in becoming a member of UCI Engineering Conference <b>*</b></label>
          <textarea type="text" v-model="user.interest" v-validate="'required'" name="first message"></textarea>
          <span class="alert">{{ errors.first('first message') }}</span>
        </div>
        <div class="item-l">
          <label class="message-label">Please outline your past experiences or qualifications for the position you selected <b>*</b></label>
          <textarea type="text" v-model="user.qualifications" v-validate="'required'" name="second message"></textarea>
          <span class="alert">{{ errors.first('second message') }}</span>
        </div>
        <div class="item-m">
          <label class="message-label">Please provide your availability (by 30min) for the next 2 weeks <b>*</b></label>
          <textarea type="text" v-model="user.availability" v-validate="'required'" name="availablity"></textarea>
          <span class="alert">{{ errors.first('availability') }}</span>
        </div>
        <div class="item-n">
          <label class="file-select">Upload your resume: <b>*</b></label>
          <input type="file" id="resume" accept="image/*,.txt,.doc,.docx,.pdf" v-validate="'required'" name="resume"/>
          <span class="alert">{{ errors.first('resume') }}</span>
        </div>
        <div class="item-o">
          <label class="file-select">Upload your unofficial transcript: <b>*</b></label>
          <input type="file" id="transcript" accept="image/*,.txt,.doc,.docx,.pdf" v-validate="'required'" name="transcript"/>
          <span class="alert">{{ errors.first('transcript') }}</span>
        </div>
        <button :disabled="loading" class="submit-button" @click="handleSubmit"><pulse-loader size="10px" color="#FFF" :loading="loading"></pulse-loader><span v-if="!loading">Submit</span></button>
      </div>
    </div>
  </div>
</template>

<script>
import PositionInfo from '../../static/positioninfo.json'
import ApplicationOptions from '../../static/ApplicationOptions.json'
import { storage } from '../main'
import {FIREBASE_COLLECTIONS} from '../utils/constants'
const utils = require('../utils/utils')

const SUCCESS_MESSAGE = `Thank you for your interest in joining our team. We will reach out to you shortly about an interview`

export default {
  data () {
    return {
      positionInfo: PositionInfo,
      classes: ApplicationOptions['Class'],
      user: { teamInterest: true, class: '', position: '', subposition: '' }, // the rest is added by the form input fields
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
        await utils.httpPost('teamApp', postData)
        this.handleFileUploadSubmit('resume')
        this.handleFileUploadSubmit('transcript')
        this.flash(SUCCESS_MESSAGE, 'success', {timeout: 3000})
        this.user = {class: '', position: '', subposition: ''}
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
    },
    handleFileUploadSubmit (filetype) {
      let selectedFile = document.getElementById(filetype).files[0]
      const uploadTask = storage.ref().child(`${filetype}/${this.user.email}-${filetype}`).put(selectedFile)
      uploadTask.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
      }, (error) => {
        console.log(error)
      }, () => {
        console.log('success')
      })
    },
    postJoin () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.addUser()
          this.handleFileUploadSubmit('resume')
          this.handleFileUploadSubmit('transcript')
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
    color: var(--error-color);
  }
  h2 {
    color: var(--white-color);
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
  select option {
    background: #FFFFFF;
  }
  input {
    width: calc(100% - 40px);
    text-align: center;
  }
  textarea {
    width: 200px;
    height: 70px;
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
  .file-select {
    font-size: 16px;
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
  .item-j {
    grid-area: item-j;
  }
  .item-k {
    grid-area: item-k;
  }
  .item-l {
    grid-area: item-l;
  }
  .item-m {
    grid-area: item-m;
  }
  .item-n {
    grid-area: item-n;
  }
  .item-o {
    grid-area: item-o;
  }
  .submit-button {
    grid-area: item-p;
    border-radius: 5px;
    width: calc(100% - 10px);
    margin-top: 16px;
  }
  .form-input {
    display: grid;
    grid-template-columns: 250px;
    grid-template-areas:
      "item-a"
      "item-b"
      "item-c"
      "item-d"
      "item-e"
      "item-f"
      "item-g"
      "item-h"
      "item-i"
      "item-j"
      "item-k"
      "item-l"
      "item-m"
      "item-n"
      "item-o"
      "item-p";
    justify-content: center;
  }
  .application {
    padding:40px;
    background-color: var(--light-black-color);
    overflow: hidden;
  }
  .position-grid {
    margin: 30px;
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }
  .title {
    font-size: 1.5em;
    padding: 0 0 10px 0;
    color: var(--green-color);
  }
  .description {
    font-size: 1em;
    padding-bottom: 2px;
  }
  .requirements-list {

  }
  .req-title, .description-title{
    padding: 0 0 6px 0px;
    color: var(--light-black-color);
  }
  .requirements {
    font-size: 14px;
    padding: 0 0 4px 22px;
    background: url('/static/img/bpoint.png') no-repeat left top;
  }
  .description-title, .req-title {
    font-weight: 700;
  }
  .page-header {
    background-image:
      linear-gradient(rgba(0, 0, 0, var(--page-header-bg)), rgba(0, 0, 0, var(--page-header-bg))),
      url(/static/page-headers/join-the-team.jpg);
  }

@media only screen and (min-width: 420px) {
  .form-input {
    grid-template-columns: 250px 250px;
    grid-template-areas:
      "item-a item-b"
      "item-c item-c"
      "item-d item-d"
      "item-e item-e"
      "item-f item-g"
      "item-h item-i"
      "item-j item-j"
      "item-k item-k"
      "item-l item-l"
      "item-m item-m"
      "item-n item-o"
      "item-p item-p";
  }
  input {
    width: calc(100% - 40px);
  }
  textarea {
    width: 460px;
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
@media only screen and (min-width: 600px) {
  .position-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media only screen and (min-width: 1200px) {
  .position-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

</style>

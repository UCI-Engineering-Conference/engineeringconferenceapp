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
            <div class="description-title">{{ data.title }} Team Description </div>
            <div class="description"> {{ data.description }}</div>
            <div class="req-title">Requirements</div>
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
          <label>Phone</label>
          <input type="text" v-validate="{ regex: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/ }" v-model="user.phone" name="phone">
          <span class="alert">{{ errors.first('phone') }}</span>
        </div>
        <div class="item-e">
          <label>Major <b>*</b></label>
          <input type="text" v-model="user.majorForEC" v-validate="'required'" name="major">
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
        <div class="item-j">
          <label class="message-label">Write a few lines about why you would be a good fit for EC and the position specified. Or specify multiple positions that you would be willing to take on!</label>
          <textarea type="text" v-model="user.messageForEC"></textarea>
        </div>
      </div>
      <modal v-show="isModalVisible" @close="closeModal">
        <h2 slot="header">All Done!</h2>
        <p slot ="body">Thank you for applying to be on the EC team. Our leadership will contact you as soon as they are available to set up an interview.</p>
      </modal>
      <button class="submit-button" @click="postJoin"><span>Submit</span></button>
    </div>
  </div>
</template>

<script>
import modal from './ApplicationModal.vue'
import PositionInfo from '../../static/positioninfo.json'
import ApplicationOptions from '../../static/ApplicationOptions.json'
import { db } from '../main'
export default {
  components: {
    modal
  },
  data () {
    return {
      isModalVisible: false,
      positionInfo: PositionInfo,
      classes: ApplicationOptions['Class'],
      user: { teamInterest: true, class: '', position: '' } // the rest is added by the form input fields
    }
  },
  methods: {
    addUser () {
      this.user.createdAt = new Date()
      this.clean()
      db.collection('students').doc(this.user.email).set(this.user, { merge: true })
        .then(function () {
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    postJoin () {
      console.log(this.user)
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.addUser()
          this.showModal()
        } else {
          console.log('Not valid')
        }
      })
    },
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    clean () {
      for (let propName in this.user) {
        if (this.user[propName] === '') {
          delete this.user[propName]
        }
      }
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
  select option {
    background: #FFFFFF;
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
    color: #606060;
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
  .submit-button {
    grid-area: item-k;
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
      "item-j";
    justify-content: center;
  }

  .application {
    padding:40px;
    background-color: #A2E49D;
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
    color: #65D25C;
  }
  .description {
    font-size: 1em;
    padding-bottom: 2px;
  }
  .requirements-list {

  }
  .req-title, .description-title{
    padding: 0 0 6px 0px;
    color: #606060;
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
      linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
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
      "item-k item-k";
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

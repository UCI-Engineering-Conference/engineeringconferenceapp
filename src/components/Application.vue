<template>
  <div>
    <div class="page-header">
      <p>Engineering Conference Application</p>
    </div>
    <div class="application">
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
          <label>Dietary Restrictions <b>*</b></label>
          <select v-model="user.diet" v-validate="'required'" name="diet">
            <option disabled value="">Please select one</option>
            <option v-for="d in diet" :key="d">{{d}}</option>
          </select>
          <span class="alert">{{ errors.first('diet') }}</span>
        </div>
        <div class="item-f">
          <label>Other Dietary Restrictions</label>
          <input type="text" v-model="user.otherDiet">
        </div>
        <div class="item-g">
          <label>School <b>*</b></label>
          <select v-model="user.school">
            <option disabled value="">Please select one</option>
            <option v-for="school in schools" :key="school">{{school}}</option>
          </select>
        </div>
        <div class="item-h">
          <label>Major <b>*</b></label>
          <div>
            <select v-if="['Engineering'].indexOf(user.school) > -1" v-model="user.major" v-validate="'required'" name="major">
              <option disabled value="">Please select one</option>
              <option v-for="major in engMajors" :key="major">{{major}}</option>
            </select>
            <select v-else-if="['Information and Computer Science'].indexOf(user.school) > -1" v-model="user.major" v-validate="'required'" name="major">
              <option disabled value="">Please select one</option>
              <option v-for="major in icsMajors" :key="major">{{major}}</option>
            </select>
            <input v-else type="text" v-model="user.major" v-validate="'required'" name="major">
            <span class="alert">{{ errors.first('major') }}</span>
          </div>
        </div>
        <div class="item-i">
          <label>Class <b>*</b></label>
          <select v-model="user.class" v-validate="'required'" name="class">
            <option disabled value="">Please select one</option>
            <option v-for="cla in classes" :key="cla">{{cla}}</option>
          </select>
          <span class="alert">{{ errors.first('class') }}</span>
        </div>
        <div class="item-j">
          <label>LinkedIn</label>
          <input type="text" v-model="user.linkedin">
        </div>
        <div class="item-k">
          <label class="message-label">Is there anything else you like us to know regarding your skills or accomplishments?</label>
          <textarea v-model="user.message"></textarea>
        </div>
      </div>
      <termsModal
        v-show="isTermsModalVisible"
        @close="closeTermsModal"
      />

      <modal v-show="isModalVisible" @close="closeModal">
        <h2 slot="header">Amazing!</h2>
        <p slot ="body">You're official registered for UCI Engineering Conference!</p>
      </modal>

      <button class="submit-button" @click="apply"><span>Submit</span></button>
      <p class="termsAndConditions">By clicking 'Submit' I agree to the <a @click="showTermsModal">Terms and Conditions</a>.</p>
    </div>
  </div>
</template>

<script>
import modal from './ApplicationModal.vue'
import termsModal from './TermsModal.vue'
import ApplicationOptions from '../../static/ApplicationOptions.json'
import { db } from '../main'
export default {
  components: {
    modal,
    termsModal
  },
  watch: {
    'user.school': function () {
      this.user.major = ''
    }
  },
  data () {
    return {
      isModalVisible: false,
      isTermsModalVisible: false,
      schools: ApplicationOptions['School'],
      engMajors: ApplicationOptions['EngMajor'],
      icsMajors: ApplicationOptions['ICSMajor'],
      classes: ApplicationOptions['Class'],
      diet: ApplicationOptions['Diet'],
      user: {applicationSubmitted: true, school: '', class: '', diet: ''}
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
    apply () {
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
    showTermsModal () {
      this.isTermsModalVisible = true
    },
    closeTermsModal () {
      this.isTermsModalVisible = false
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
  a {
    cursor: pointer;
    text-decoration: none;
    color: #FFB511;
  }
  a:hover {
    text-decoration: underline;
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
  .item-k {
    grid-area: item-k;
  }
  .submit-button {
    grid-area: item-l;
  }
  .form-input {
    justify-content: center;
  }
  .application {
    padding: 40px;
    overflow: hidden;
  }
.termsAndConditions {
  color: #606060;
  font-weight: 300;
  font-size: 14px;
}
label {
  text-align: left;
}
.page-header {
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(/static/page-headers/application.jpg);
}

@media only screen and (min-width: 500px) {
  .form-input {
    display: grid;
    grid-template-columns: 250px 250px;
    grid-template-areas:
      "item-a item-b"
      "item-c item-c"
      "item-d item-d"
      "item-e item-f"
      "item-g item-g"
      "item-h item-i"
      "item-j item-j"
      "item-k item-k"
      "item-l item-l";
    justify-content: center;
  }
  textarea {
    width: 460px;
    height: 100px;
    text-align: left;
  }
}
</style>

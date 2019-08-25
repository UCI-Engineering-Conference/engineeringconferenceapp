<template>
  <div>
    <link href="/../../static/stripe.css" rel="stylesheet">

    <div class="page-header">
      <p>Engineering Conference Application</p>
    </div>
    <div class="application">
     <form id="form-input" @submit.prevent="handleSubmit">
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
         <label>Gender <b>*</b></label>
         <select v-model="user.gender" v-validate="'required'" name="gender">
           <option disabled value="">Please select one</option>
           <option v-for="g in gender" :key="g">{{g}}</option>
         </select>
         <span class="alert">{{ errors.first('gender') }}</span>
       </div>
        <div class="item-f">
          <label>Dietary Restrictions <b>*</b></label>
          <select v-model="user.diet" v-validate="'required'" name="diet">
            <option disabled value="">Please select one</option>
            <option v-for="d in diet" :key="d">{{d}}</option>
          </select>
          <span class="alert">{{ errors.first('diet') }}</span>
        </div>
        <div class="item-g">
          <label>Other Dietary Restrictions</label>
          <input type="text" v-model="user.otherDiet">
        </div>
        <div class="item-h">
          <label>School <b>*</b></label>
          <select v-model="user.school" v-validate="'required'" name="school">
            <option disabled value="">Please select one</option>
            <option v-for="school in schools" :key="school">{{school}}</option>
          </select>
          <span class="alert">{{ errors.first('school') }}</span>
        </div>
        <div class="item-i">
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
        <div class="item-j">
          <label>Class <b>*</b></label>
          <select v-model="user.class" v-validate="'required'" name="class">
            <option disabled value="">Please select one</option>
            <option v-for="cla in classes" :key="cla">{{cla}}</option>
          </select>
          <span class="alert">{{ errors.first('class') }}</span>
        </div>
       <div class="item-k">
         <label>Committee Preference <b>*</b></label>
         <select v-model="user.committee" v-validate="'required'" name="committee">
           <option disabled value="">Please select one</option>
           <option v-for="com in committee" :key="com" :disabled="fullCommittees.indexOf(com) > -1">{{com}}</option>
         </select>
         <span class="alert">{{ errors.first('class') }}</span>
       </div>
        <div class="item-l" v-if="user.major !== '' && ['Engineering', 'Information and Computer Science'].indexOf(user.school) > -1" >
          <label>Skills ( 1:No Knowledge Of -- 5:Confident )</label>
          <div style="display: flex;flex-wrap: wrap;justify-content: center;">
            <div v-if="['MAE', 'Mechanical', 'Aerospace'].indexOf(user.major) > -1" v-for="skill in skills['MAE']" :key="skill">
              <select v-model="user.skills[skill]" style="height: 40px; width:40px; margin: 10px 10px 10px 10px;">
                <option v-for="option in ['1', '2', '3', '4', '5']" v-bind:key="option" v-bind:value="option">
                  {{ option }}
                </option>
              </select>
              <span>{{skill}}</span>
            </div>
            <div v-if="['Environmental', 'Civil'].indexOf(user.major) > -1" v-for="skill in skills['CE']" :key="skill">
              <select v-model="user.skills[skill]" style="height: 40px; width:40px; margin: 10px 10px 10px 10px;">
                <option v-for="option in ['1', '2', '3', '4', '5']" v-bind:key="option" v-bind:value="option">
                  {{ option }}
                </option>
              </select>
              <span>{{skill}}</span>
            </div>
            <div v-if="['Chemical', 'Biomedical', 'Material Science'].indexOf(user.major) > -1" v-for="skill in skills['CBMS']" :key="skill">
              <select v-model="user.skills[skill]" style="height: 40px; width:40px; margin: 10px 10px 10px 10px;">
                <option v-for="option in ['1', '2', '3', '4', '5']" v-bind:key="option" v-bind:value="option">
                  {{ option }}
                </option>
              </select>
              <span>{{skill}}</span>
            </div>
            <div v-if="user.school === 'Information and Computer Science' || ['Electrical', 'Computer', 'Computer Science and Engineering'].indexOf(user.major) > -1" v-for="skill in skills['EECS']" :key="skill">
              <select v-model="user.skills[skill]" style="height: 40px; width:40px; margin: 10px 10px 10px 10px;">
                <option v-for="option in ['1', '2', '3', '4', '5']" v-bind:key="option" v-bind:value="option">
                  {{ option }}
                </option>
              </select>
              <span>{{skill}}</span>
            </div>
          </div>
        </div>
        <div class="item-m">
          <label>LinkedIn</label>
          <input type="text" v-model="user.linkedin">
        </div>
        <div class="item-n">
          <label class="message-label">Is there anything else you like us to know regarding your skills or accomplishments?</label>
          <textarea v-model="user.message"></textarea>
        </div>
        <div class="item-o">
          <label>For EC member use.</label>
          <input type="password" v-model="user.VenmoPswd">
        </div>
        <div class="item-p">
          <label>Credit or debit card <b>*</b></label>
          <p class="termsAndConditions">The price of a ticket is $25.00 + an additional transaction fee **</p>
          <div ref="card"></div>
          <div id="card-errors" role="alert"></div>
        </div>

      <button :disabled="!submitActive" class="submit-button"><span>Submit</span></button>
      </form>

      <termsModal
        v-show="isTermsModalVisible"
        @close="closeTermsModal"
      />

      <modal v-show="isModalVisible" @close="closeModal">
        <h2 slot="header">Amazing!</h2>
        <p slot ="body">You're officially registered for UCI Engineering Conference!</p>
      </modal>
      <p class="termsAndConditions">By clicking 'Submit' I agree to the <a @click="showTermsModal">Terms and Conditions</a>.</p>
      <p class="termsAndConditions">** The additional transaction fee will bring the total ticket cost to $26.05.</p>
    </div>
  </div>
</template>

<script>
import modal from './ApplicationModal.vue'
import termsModal from './TermsModal.vue'
import ApplicationOptions from '../../static/ApplicationOptions.json'
import generalContent from '../../static/GeneralContent.json'
import { db } from '../main'
import axios from 'axios'
import qs from 'qs'

// eslint-disable-next-line
let stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY)
let elements = stripe.elements()
let card

let style = {
  base: {
    color: '#606060',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    fontWeight: '700',
    '::placeholder': {
      color: '#D3D3D3'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
}

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
      fullCommittees: ApplicationOptions['FullCommittee'],
      schools: ApplicationOptions['School'],
      engMajors: ApplicationOptions['EngMajor'],
      icsMajors: ApplicationOptions['ICSMajor'],
      classes: ApplicationOptions['Class'],
      skills: ApplicationOptions['Skills'],
      diet: ApplicationOptions['Diet'],
      gender: ApplicationOptions['Gender'],
      committee: ApplicationOptions['Committee'],
      generalContent: generalContent,
      submitActive: true,
      user: {major: '', school: '', class: '', diet: '', gender: '', committee: '', paid: 'CARD', skills: {}},
      mailingListUser: {}
    }
  },
  mounted () {
    card = elements.create('card', {style: style})
    card.mount(this.$refs.card)
    card.addEventListener('change', function (event) {
      let displayError = document.getElementById('card-errors')
      if (event.error) {
        displayError.textContent = event.error.message
      } else {
        displayError.textContent = ''
      }
    })
  },
  beforeDestroy () {
    card.unmount()
    card.destroy()
  },
  methods: {
    addUser () {
      this.user.createdAt = new Date().toLocaleString()
      this.user.skills = JSON.stringify(this.user.skills)
      this.mailingListUser = {
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        phone: this.user.phone,
        createdAt: this.user.createdAt
      }
      this.clean()
      db.collection('2018-2019 Attendees').doc(this.user.email).set(this.user, { merge: true })
        .then(function () {
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
      db.collection('Mailing List').doc(this.user.email).set(this.mailingListUser, { merge: true })
        .then(function () {
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    handleSubmit () {
      this.submitActive = false
      this.$validator.validateAll().then((result) => {
        if (!result) {
          console.log('Not Valid')
          this.submitActive = true
        } else {
          if (this.user.VenmoPswd === process.env.VENMO_PSWD) {
            this.user.paid = 'VENMO'
            this.createAttendee()
          } else {
            stripe.createToken(card).then((result2) => {
              if (result2.error) {
                // Inform the user if there was an error.
                let errorElement = document.getElementById('card-errors')
                errorElement.textContent = result2.error.message
                this.submitActive = true
              } else {
                const data = {
                  email: this.user.email,
                  stripeToken: result2.token.id
                }
                axios({
                  method: 'POST',
                  url: `https://wt-ec93f04fb278b9f3f2b7a660e2425240-0.sandbox.auth0-extend.com/stripecharge/payment`,
                  data: qs.stringify(data),
                  config: {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                }).then(response => {
                  this.createAttendee()
                })
                  .catch(e => {
                    console.log(e)
                  })
              }
            }).catch(e => {
              console.log(e)
            })
          }
        }
      })
    },
    createAttendee () {
      const content = `
        <div style="text-align:center">
          <img alt="Engineering Conference" style="width:50%;" src="http://www.engineeringconferenceuci.com/static/img/thumbnail.png" />
        </div>
        <div style="padding:5px;margin-top:10px;background-color: #65D25C;">
        </div>
        <p><b>Amazing,</b></p>
        <p>This is the official ticket receipt for <b>${this.user.firstname} ${this.user.lastname}</b> to attend Engineering Conference on <b>${generalContent.Date}</b>.</p>
        <p></p>
        <p>Cheers,</p>
        <p><b>UCI Engineering Conference</b></p>
        <div style="background-color: #65D25C;padding: 20px;color: #FFFFFF; text-align:center">
          <a href="https://www.facebook.com/EConferenceUCI"><img alt="Facebook" style="display:inline-block; padding:10px;width:25px;" src="https://cdn4.iconfinder.com/data/icons/social-media-outline-3/60/Social-01-Facebook-Outline-128.png" /></a>
          <a href="https://twitter.com/@EConferenceUCI"><img alt="Twitter" style="display:inline-block; padding:10px;width:25px;" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-twitter-outline-128.png" /></a>
          <a href="https://instagram.com/EConferenceUCI"><img alt="Instagram" style="display:inline-block; padding:10px;width:25px;" src="https://cdn4.iconfinder.com/data/icons/materia-social-free/24/038_011_instagram_mobile_photo_network_android_material-128.png" /></a>
        </div>
      `
      axios.post(`https://wt-ec93f04fb278b9f3f2b7a660e2425240-0.sandbox.auth0-extend.com/attendeeEmailConfirmation`, {
        to_email: this.user.email,
        from_email: 'engineeringconferenceuci@gmail.com',
        subject: 'Engineering Conference (1 ticket purchased)',
        content: content
      })
        .then(response => {})
        .catch(e => {
          console.log(e)
        })
      this.addUser()
      this.showModal()
    },
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
      this.user = {major: '', school: '', class: '', diet: '', paid: 'CARD', skills: {}}
      this.mailingListUser = {}
      this.submitActive = true
      card.clear()
    },
    showTermsModal () {
      this.isTermsModalVisible = true
    },
    closeTermsModal () {
      this.isTermsModalVisible = false
    },
    clean () {
      Object.keys(this.user).filter(propName => !this.user[propName])
        .map(propName => delete this.user[propName])
      Object.keys(this.mailingListUser).filter(propName => !this.mailingListUser[propName])
        .map(propName => delete this.mailingListUser[propName])
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
    color: var(--green-color);
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
  .item-p {
    grid-area: item-p;
  }
  .submit-button {
    grid-area: item-q;
    border-radius: 5px;
    width: 96%;
    margin-left: 2%;
    margin-top: 16px;
  }

  .application {
    justify-content: center;
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
    linear-gradient(rgba(0, 0, 0, var(--page-header-bg)), rgba(0, 0, 0, var(--page-header-bg))),
    url(/static/page-headers/application.jpg);
}

@media only screen and (min-width: 500px) {
  #form-input {
    display: grid;
    grid-template-columns: 250px 250px;
    grid-template-areas:
      "item-a item-b"
      "item-c item-c"
      "item-d item-e"
      "item-f item-g"
      "item-h item-i"
      "item-j item-k"
      "item-l item-l"
      "item-m item-m"
      "item-n item-n"
      "item-o item-o"
      "item-p item-p"
      "item-q item-q";
    justify-content: center;
  }
  textarea {
    width: 460px;
    height: 100px;
    text-align: left;
  }
}
</style>

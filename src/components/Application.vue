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

      <button :disabled="loading" class="submit-button"><pulse-loader size="10px" color="#FFF" :loading="loading"></pulse-loader><span v-if="!loading">Submit</span></button>
      </form>

      <termsModal
        v-show="isTermsModalVisible"
        @close="closeTermsModal"
      />

      <p class="termsAndConditions">By clicking 'Submit' I agree to the <a @click="showTermsModal">Terms and Conditions</a>.</p>
      <p class="termsAndConditions">** The additional transaction fee will bring the total ticket cost to ${{generalContent.Price/100}}</p>
    </div>
  </div>
</template>

<script>
import termsModal from './TermsModal.vue'
import ApplicationOptions from '../../static/ApplicationOptions.json'
import generalContent from '../../static/GeneralContent.json'
import {FIREBASE_COLLECTIONS} from '../utils/constants'
const utils = require('../utils/utils')

const SUCCESS_MESSAGE = `You're officially registered for UCI Engineering Conference!`
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
    termsModal
  },
  watch: {
    'user.school': function () {
      this.user.major = ''
    }
  },
  data () {
    return {
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
      loading: false,
      user: {major: '', school: '', class: '', diet: '', gender: '', committee: '', paid: 'CARD', skills: {}, stripeToken: ''}
    }
  },
  mounted () {
    card = elements.create('card', {style: style})
    card.mount(this.$refs.card)
    card.addEventListener('change', (event) => {
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
        this.user.skills = JSON.stringify(this.user.skills)
        const postData = {
          applicant: this.user,
          CONFIG: {
            CONFERENCE_DATE: generalContent.Date,
            TICKET_PRICE: generalContent.Price
          },
          FIREBASE_COLLECTIONS
        }
        await utils.httpPost('attendeeApp', postData)
        this.flash(SUCCESS_MESSAGE, 'success', {timeout: 3000})
        this.user = {major: '', school: '', class: '', diet: '', paid: 'CARD', skills: {}}
        card.clear()
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

      if (this.user.VenmoPswd === process.env.VENMO_PSWD) {
        this.user.paid = 'VENMO'
      } else {
        const stripeToken = await stripe.createToken(card)
        if (stripeToken.error) {
          // Inform the user if there was an error.
          let errorElement = document.getElementById('card-errors')
          errorElement.textContent = stripeToken.error.message
          return {valid: false, message: 'Card not Valid'}
        }
        this.user.paid = 'CARD'
        this.user.stripeToken = stripeToken.token.id
      }
      return {valid: true, message: ''}
    },
    showTermsModal () {
      this.isTermsModalVisible = true
    },
    closeTermsModal () {
      this.isTermsModalVisible = false
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

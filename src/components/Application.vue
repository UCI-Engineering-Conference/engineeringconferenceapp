<template>
  <div class="container">
    <h3 class="text-center mb-3">Application</h3>
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-md-12 order-md-1">
          <h4 class="mb-3">Profile</h4>
          <div class="row">
            <div class="col-md-6">
              <label>First name<b>*</b></label>
              <input type="text" class="form-control" v-model="user.firstname" v-validate="'required'" name="first name">
              <span class="alert text-danger">{{ errors.first('first name') }}</span>
            </div>
            <div class="col-md-6">
              <label>Last name<b>*</b></label>
              <input type="text" class="form-control" v-model="user.lastname" v-validate="'required'" name="last name">
              <span class="alert text-danger">{{ errors.first('last name') }}</span>
            </div>
          </div>
          <div class="">
            <label>Email<b>*</b></label>
            <input type="email" class="form-control"  v-model="user.email" v-validate="'required|email'" name="email">
            <span class="alert text-danger">{{ errors.first('email') }}</span>
          </div>
          <div class="">
            <label>Phone<b>*</b></label>
            <input type="text" class="form-control" v-validate="{ regex: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/ }" v-model="user.phone" name="phone">
            <span class="alert text-danger">{{ errors.first('phone') }}</span>
          </div>
          <div class="row">
            <div class="col-md-4 mb-3">
              <label>Gender<b>*</b></label>
              <select class="custom-select d-block w-100" v-model="user.gender" v-validate="'required'" name="gender">
                <option disabled value="">Please select one</option>
                <option v-for="g in gender" :key="g">{{g}}</option>
              </select>
              <span class="alert text-danger">{{ errors.first('gender') }}</span>
            </div>
            <div class="col-md-4 mb-3">
              <label>Dietary Restrictions<b>*</b></label>
              <select class="custom-select d-block w-100" v-model="user.diet" v-validate="'required'" name="diet">
                <option disabled value="">Please select one</option>
                <option v-for="d in diet" :key="d">{{d}}</option>
              </select>
              <span class="alert text-danger">{{ errors.first('diet') }}</span>
            </div>
            <div class="col-md-4 mb-3">
              <label>Other Dietary Restrictions</label>
              <input type="text" class="form-control" v-model="user.otherDiet">
              <div class="invalid-feedback">
                Zip code required.
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 mb-3">
              <label>School<b>*</b></label>
              <select class="custom-select d-block w-100" v-model="user.school" v-validate="'required'" name="school">
                <option disabled value="">Please select one</option>
                <option v-for="school in schools" :key="school">{{school}}</option>
              </select>
              <span class="alert text-danger">{{ errors.first('school') }}</span>
            </div>
            <div class="col-md-4 mb-3">
              <label>Major<b>*</b></label>
              <div>
                <select class="custom-select d-block w-100" v-if="['Engineering'].indexOf(user.school) > -1" v-model="user.major" v-validate="'required'" name="major">
                  <option disabled value="">Please select one</option>
                  <option v-for="major in engMajors" :key="major">{{major}}</option>
                </select>
                <select class="custom-select d-block w-100" v-else-if="['Information and Computer Science'].indexOf(user.school) > -1" v-model="user.major" v-validate="'required'" name="major">
                  <option disabled value="">Please select one</option>
                  <option v-for="major in icsMajors" :key="major">{{major}}</option>
                </select>
                <input class="form-control" v-else type="text" v-model="user.major" v-validate="'required'" name="major">
                <span class="alert text-danger">{{ errors.first('major') }}</span>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <label>Class<b>*</b></label>
              <select class="custom-select d-block w-100" v-model="user.class" v-validate="'required'" name="class">
                <option disabled value="">Please select one</option>
                <option v-for="cla in classes" :key="cla">{{cla}}</option>
              </select>
              <span class="alert text-danger">{{ errors.first('class') }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 mb-3">
              <label>Committee Preference<b>*</b></label>
              <select class="custom-select d-block w-100" v-model="user.committee" v-validate="'required'" name="committee">
                <option disabled value="">Please select one</option>
                <option v-for="com in committee" :key="com" :disabled="fullCommittees.indexOf(com) > -1">{{com}}</option>
              </select>
              <p id="toggle-collapse" v-b-toggle.collapse-2 class="m-1"><em>Learn More</em></p>
              <b-collapse id="collapse-2">
                <b-card>
                  <h4>Air Mover - MAE</h4>
                  <p class="mb-4">The overall goal for the Air Mover committee is the design of the turbine assembly. As the overall goal of this project is to collect and separate carbon dioxide from the air, one of the most important parts is to actually get the air to pass through the carbon-catching membrane. </p>
                  <h4>Carbon Storer - CEE</h4>
                  <p class="mb-4">Teams are responsible for designing a system which can both store and transport fluid CO2 after it is extracted from the atmosphere. Geological solutions, cost-effective materials, and analysis methods are examples of choices that may affect the overall capacity and efficiency of your design.</p>
                  <h4>Membrain - CBEMS</h4>
                  <p class="mb-4">The goal of Membrain is to create a membrane that can filter out CO2 through various methods. Most membranes will be geared towards utilizing temperature and pressure along with gaseous speed and flow rate.</p>
                  <h4>Pycontrol - EECS</h4>
                  <p class="mb-4">The overall goal of the PyControl committee is to create a control system that will use sensors to monitor the environment and collect information. From this feedback, further action can be taken to create a more efficient process.</p>
                </b-card>
              </b-collapse>
              <span class="alert text-danger">{{ errors.first('committee') }}</span>
            </div>
            <div v-if="user.major !== '' && ['Engineering', 'Information and Computer Science'].indexOf(user.school) > -1" >
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
            <div class="col-md-4 mb-3">
              <label>Linkedin</label>
              <input type="text" class="form-control" v-model="user.linkedin">
            </div>
            <div class="col-md-4 mb-3">
              <label class="text-muted"><em>For Administrator Only</em></label>
              <input class="form-control" type="password" v-model="user.VenmoPswd">
            </div>
          </div>
          <label class="message-label">Is there anything else you like us to know regarding your skills or accomplishments?</label>
          <textarea v-model="user.message" class="form-control" style="resize: none; min-height: 90px;"></textarea>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-5 order-md-4 mb-4 mt-3">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Summary</span>
            <span class="badge badge-secondary badge-pill">1</span>
          </h4>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 class="my-0">Admission Pass</h6>
                <small class="text-muted">Valid for 3 Days</small>
              </div>
              <span class="text-muted">$72.60</span>
            </li>
            <li class="list-group-item d-flex justify-content-between bg-light">
              <div class="text-success">
                <p class="text-success">Transaction fee</p>
              </div>
              <span class="text-success">$2.40</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>$75.00</strong>
            </li>
            <p class="text-muted text-center mb-4">We give $25.00 to Charity! ❤️</p>
          </ul>
        </div>
        <div class="col-md-7 ">
          <h4 class="mb-3">Payment</h4>
          <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
            Dismissible Alert!
          </b-alert>
          <div class="row">
            <div class="item-p">
              <label class="mb-3">Credit/Debit Card<b>*</b></label>
              <div ref="card"></div>
              <div id="card-errors" role="alert text-danger"></div>
            </div>
          </div>
          <hr class="mb-5">
          <button class="btn btn-primary btn-lg btn-block" :disabled="loading"><pulse-loader size="10px" color="#FFF" :loading="loading"></pulse-loader><span v-if="!loading">Submit</span></button>
          <div class="container text-center mt-3 mb-4">
            <p class="termsAndConditions">By clicking 'Submit' I agree to the <span class="terms_link text-primary"><a @click="$bvModal.show('bv-modal-example')">Terms and Conditions</a></span>.</p>
          </div>
          <b-modal id="bv-modal-example" hide-footer title="Terms and Conditions" class="modal-fullscreen1">
            <div style="height: 330px; overflow-x: hidden;">
              <ul>
                <li v-for="(data, index) in termsList" :key="index">
                  <div class="term">
                    <div class="lead">{{ data.title }}</div>
                    <ul class="requirements-list">
                      <li v-for="(req, k) in data.conditions" :key="k">
                        <div class="requirements">{{ req }}</div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </b-modal>
        </div>
      </div>
    </form>
  </div>

</template>

<style>
  @import '../../static/style.css';
</style>

<script>
import ApplicationOptions from '../../static/ApplicationOptions.json'
import generalContent from '../../static/GeneralContent.json'
import TermsList from '../../static/TermsList.json'

import {FIREBASE_COLLECTIONS} from '../../src/utils/constants'
const utils = require('../../src/utils/utils')
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
  watch: {
    'user.school': function () {
      this.user.major = ''
    }
  },
  data () {
    return {
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
      user: {major: '', school: '', class: '', diet: '', gender: '', committee: '', paid: 'CARD', skills: {}, stripeToken: ''},
      termsList: TermsList
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
        this.$router.push('/success')
        this.user = {major: '', school: '', class: '', diet: '', paid: 'CARD', skills: {}}
        card.clear()
      } catch (e) {
        if (e.response) {
          console.log(`Form submission failed: ${(e.response.data.invalid || e.response.data.error).msg}`)
          if (e.response.status === 400) {
            this.flash(e.response.data.invalid.msg, 'info', {timeout: 3000})
            this.$router.push('/error')
          } else {
            this.flash(e.response.data.error.msg, 'error', {timeout: 3000})
            this.$router.push('/error')
          }
        } else {
          console.log('Nothing recieved from server..')
          this.flash(`No response: ${e}`, 'error', {timeout: 3000})
          this.$router.push('/error')
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
    }
  }
}
</script>

<style scoped>
  b {
    color: red;
  }
  .item-p {
    min-width: 300px;
    margin-left: 20px;
  }
  .termsAndConditions {
    color: #606060;
    font-weight: 300;
    font-size: 14px;
  }
  .terms_link {
    cursor: pointer;
  }
#toggle-collapse {
  cursor: pointer;
}

#toggle-collapse:hover {
  cursor: pointer;
  color: #65d25c;
}

</style>

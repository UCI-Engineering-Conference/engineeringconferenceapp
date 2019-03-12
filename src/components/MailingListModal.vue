<script>
import { db } from '../main'
export default {
  name: 'modal',
  data () {
    return {
      user: {onMailingList: true}
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    addUser () {
      this.user.createdAt = new Date().toLocaleString()
      this.clean()
      db.collection('Mailing List').doc(this.user.email).set(this.user, { merge: true })
        .then(function () {
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    postEmail () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.addUser()
          this.$emit('close')
        } else {
          console.log('Not valid')
        }
      })
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
<template>
  <transition name="modalm">
    <div class="modalm-mask">
      <div class="modalm-wrapper">
        <div class="modalm-container">
          <div class="modalm-header">
            <button style="float:right;" class="modal-close-button" @click="$emit('close')"><close /></button>
            <br/><br/>
            <h2>Join our Community!</h2>
          </div>
          <div class="modalm-body">
            <div class="formInput">
              <label>Full Name <b>*</b></label>
              <input type="text" v-model="user.fullName" v-validate="'required'" name="username">
              <span class="alert">{{ errors.first('username') }}</span>
            </div>
            <div class="formInput">
              <label>Email <b>*</b></label>
              <input type="text" v-model="user.email" v-validate="'required|email|is_uci_email'" name="email">
              <span class="alert">{{ errors.first('email') }}</span>
            </div>
            <div class="formInput">
              <label>Phone</label>
              <input type="text" v-validate="{ regex: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/ }" v-model="user.phone" name="phone">
              <span class="alert">{{ errors.first('phone') }}</span>
            </div>
          </div>
          <div class="modalm-footer">
            <div name="footer">
              <button class="submit-button" @click="postEmail"><span>Submit</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style>
  .formInput b {
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
    color: #606060;
    border: 2px solid #D3D3D3;
  }
  label {
    color: #606060;
    font-size: 2em;
  }
  .formInput {
    padding: 10px;
  }

  .modal-close-button {
    color: #606060;
    border: none;
    cursor: pointer;
    -webkit-transition: all 500ms ease;
    -moz-transition: all 500ms ease;
    -o-transition: all 500ms ease;
    transition: all 500ms ease;
  }
  .modal-close-button:hover {
    color: red;
  }
  .modalm-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(162, 228, 157, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modalm-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modalm-container {
    width: 200px;
    max-height: 400px;
    overflow-y: auto;
    margin: 0px auto;
    padding: 20px 30px 8px 30px;
    background: url(/static/img/MailModalBG.png) no-repeat center center;
    background-size: cover;
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    border: 5px solid #808080;
  }

  .modalm-header h2 {
    margin-top: 0;
    color: #65D25C;
  }

  .modalm-body {
    margin: 20px 0;
  }

  .modalm-footer {
    padding-bottom: 30px;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modalm-container,
  .modal-leave-active .modalm-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  @media only screen and (min-width: 400px) {
    .modalm-container {
      width: 300px;
      max-height: 500px;
    }

  }
</style>

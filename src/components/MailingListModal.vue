<script>
import { db } from '../main'
export default {
  name: 'modal',
  data () {
    return {
      user: {
        name: '',
        email: '',
        phone: '',
        createdAt: ''
      },
      users: []
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    addUser () {
      this.user.createdAt = new Date()
      db.collection('mailingList').add(this.user)
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
    }
  },
  firestore () {
    return {
      users: db.collection('mailingList')
    }
  }
}
</script>
<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <button style="float:right;" class="modal-default-button" @click="$emit('close')"><close /></button>
            <br/><br/>
            <h2>Join our Community!</h2>
          </div>
          <div class="modal-body">
            <div class="formInput">
              <label>Full Name</label>
              <input type="text" v-model="user.name" v-validate="'required'" name="username">
              <span class="alert">{{ errors.first('username') }}</span>
            </div>
            <div class="formInput">
              <label>Email</label>
              <input type="text" v-model="user.email" v-validate="'required|email'" name="email">
              <span class="alert">{{ errors.first('email') }}</span>
            </div>
            <div class="formInput">
              <label>Phone</label>
              <input type="text" v-model="user.phone">
            </div>
          </div>
          <div class="modal-footer">
            <div name="footer">
              <button class="submit-button" @click="postEmail"><arrow-right-bold-circle /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style>
  input, label {
    display: block;
    margin: auto;
  }
  input {
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
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
  .submit-button {
    float:right;
  }
  .modal-mask {
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

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-image: url(/static/img/MailModalBG.png);
    background-repeat:   no-repeat;
    background-position: center center;
    background-size: cover;
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    border: 5px solid #808080;
  }

  .modal-header h2 {
    margin-top: 0;
    color: #65D25C;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-footer {
    padding: 30px;
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

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .alert {
    background:
  }
</style>

<template>
<div>
  <div class="nameFormInput">
    <input v-model="user.name" v-validate="'required'" name="username">
    <span class="alert">{{ errors.first('username') }}</span>
  </div>
  <div>
    <input v-model="user.email" v-validate="'required|email'" name="email">
    <span class="alert">{{ errors.first('email') }}</span>
  </div>
  <div class="messageFormInput">
    <textarea v-model="user.message" v-validate="'required'" name="message"></textarea>
    <span class="alert">{{ errors.first('message') }}</span>
  </div>
  <button @click="postMessage">Submit</button>
</div>
</template>

<script>
import { db } from '../main'
export default {
  data () {
    return {
      user: {
        name: '',
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

<template>
<div>
<link href="/../../static/table-component.css" rel="stylesheet">

  <h2>Mailing List</h2>
  <table-component
    :data="mailingList"
    sort-by="createdAt"
    sort-order="asc"
  >
    <table-column show="name" label="Full Name"></table-column>
    <table-column show="email" label="Email"></table-column>
    <table-column show="phone" label="Phone"></table-column>
    <table-column show="createdAt" label="Date"></table-column>
  </table-component>

  <h2>Student Recruitment</h2>
  <table-component
    :data="teaminterestapp"
    sort-by="createdAt"
    sort-order="asc"
  >
    <table-column show="name" label="Full Name"></table-column>
    <table-column show="email" label="Email"></table-column>
    <table-column show="phone" label="Phone"></table-column>
    <table-column show="createdAt" label="Date"></table-column>
  </table-component>

  <h2>Messages</h2>
  <table-component
    :data="messages"
    sort-by="createdAt"
    sort-order="asc"
  >
    <table-column show="name" label="Full Name"></table-column>
    <table-column show="email" label="Email"></table-column>
    <table-column show="message" label="Message"></table-column>
    <table-column show="createdAt" label="Date"></table-column>
  </table-component>

</div>
</template>

<script>
import { db } from '../main'
export default {
  data () {
    return {
      mailingList: [],
      teaminterestapp: [],
      messages: []
    }
  },
  firestore () {
    return {
      mailingList: db.collection('mailingList'),
      teaminterestapp: db.collection('teaminterestapp'),
      messages: db.collection('messages')
    }
  }
}
</script>

<style scoped>
</style>

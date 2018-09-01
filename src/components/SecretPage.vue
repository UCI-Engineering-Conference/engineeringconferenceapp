<template>
<div>
<link href="/../../static/table-component.css" rel="stylesheet">

  <br/>
  <h2>Statistics</h2> <button @click="refresh">Refresh</button>
  <p>Applied: {{ numberOfApps }}</p>
  <p>MAE: {{ numberOfMAE }}</p>
  <p>EECS: {{ numberOfEECS }}</p>
  <p>CE: {{ numberOfCE }}</p>
  <p>CHEM: {{ numberOfCHEM }}</p>

  <h2>Students</h2>
  <table-component
    :data="students"
    sort-by="createdAt"
    sort-order="asc"
  >
    <table-column show="email" label="Email"></table-column>
    <table-column show="onMailingList" label="On Mailing List"></table-column>
    <table-column show="applicationSubmitted" label="Has Applied"></table-column>
    <table-column show="teamInterest" label="Team Interest"></table-column>

    <table-column show="fullName" label="Full Name"></table-column>
    <table-column show="firstname" label="First Name"></table-column>
    <table-column show="lastname" label="Last Name"></table-column>
    <table-column show="phone" label="Phone"></table-column>
    <table-column show="school" label="School"></table-column>
    <table-column show="major" label="Major"></table-column>
    <table-column show="graduationyear" label="Year"></table-column>
    <table-column show="linkedin" label="LinkedIn"></table-column>
    <table-column show="message" label="Message For APP"></table-column>

    <table-column show="position" label="Position"></table-column>
    <table-column show="messageForEC" label="Message For EC"></table-column>
    <table-column show="majorForEC" label="Major For EC"></table-column>
    <table-column show="createdAt" label="Date"></table-column>
  </table-component>

</div>
</template>

<script>
import { db } from '../main'
export default {
  data () {
    return {
      students: [],
      numberOfApps: 0,
      numberOfMAE: 0,
      numberOfEECS: 0,
      numberOfCE: 0,
      numberOfCHEM: 0
    }
  },
  methods: {
    refresh () {
      this.numberOfApps = 0
      this.numberOfMAE = 0
      this.numberOfEECS = 0
      this.numberOfCE = 0
      this.numberOfCHEM = 0
      console.log(this.students)
      this.students.forEach(function (student) {
        if (student.applicationSubmitted) {
          this.numberOfApps++
          if (['Aerospace', 'Mechanical'].indexOf(student.major) > -1) this.numberOfMAE++
          else if (['Computer Science and Engineering', 'Computer', 'Computer Science'].indexOf(student.major) > -1) this.numberOfEECS++
          else if (['Civil', 'Environmental'].indexOf(student.major) > -1) this.numberOfCE++
          else if (['Biomedical', 'Chemical', 'Material Science'].indexOf(student.major) > -1) this.numberOfCHEM++
        }
      }.bind(this))
    }
  },
  firestore () {
    return {
      students: db.collection('students')
    }
  }
}
</script>

<style scoped>
</style>

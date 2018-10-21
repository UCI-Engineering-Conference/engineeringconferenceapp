<template>
<div>
<link href="/../../static/table-component.css" rel="stylesheet">
<link href="/../../static/tabs-component.css" rel="stylesheet">

  <br/>
  <button @click="refresh">Refresh</button>

  <modal v-show="isModalVisible" @close="closeModal" >
    <h2 slot="header">{{justPaid.firstname}} {{justPaid.lastname}} has now</h2>
    <p v-if="justPaid.paid" slot ="body">Officially <b>PAID</b> for UCI Engineering Conference!</p>
    <p v-else slot ="body">Has now <b>UNPAID</b> for UCI Engineering Conference!</p>
  </modal>
  <div>
    <tabs>
      <tab name="Applicants">
        <table-component
          :data="applicants"
          sort-by="createdAt"
          sort-order="desc"
          @rowClick="rowClicked"
        >
          <table-column show="firstname" label="First Name"></table-column>
          <table-column show="lastname" label="Last Name"></table-column>
          <table-column show="paid" label="Has Paid"></table-column>
          <table-column show="email" label="Email"></table-column>
          <table-column show="phone" label="Phone"></table-column>
          <table-column show="diet" label="Diet"></table-column>
          <table-column show="otherDiet" label="Other Diet"></table-column>
          <table-column show="school" label="School"></table-column>
          <table-column show="major" label="Major"></table-column>
          <table-column show="class" label="Class"></table-column>
          <table-column show="linkedin" label="LinkedIn"></table-column>
          <table-column show="message" label="Message For APP"></table-column>
          <table-column show="createdAt" label="Date"></table-column>
        </table-component>
      </tab>
      <tab name="Team Interest">
        <table-component
          :data="teamInterest"
          sort-by="createdAt"
          sort-order="desc"
        >
          <table-column show="firstname" label="First Name"></table-column>
          <table-column show="lastname" label="Last Name"></table-column>
          <table-column show="email" label="Email"></table-column>
          <table-column show="phone" label="Phone"></table-column>
          <table-column show="majorForEC" label="Major"></table-column>
          <table-column show="class" label="Class"></table-column>
          <table-column show="linkedin" label="LinkedIn"></table-column>
          <table-column show="position" label="Position"></table-column>
          <table-column show="hours" label="Hrs/Week"></table-column>
          <table-column show="messageForEC" label="Message"></table-column>

          <table-column show="createdAt" label="Date"></table-column>
        </table-component>
      </tab>
      <tab name="Statistics">
        <p>Applied: {{ numberOfApps }}</p>
        <p>MAE: {{ numberOfMAE }}</p>
        <p>EECS: {{ numberOfEECS }}</p>
        <p>CE: {{ numberOfCE }}</p>
        <p>CHEM: {{ numberOfCHEM }}</p>
      </tab>
      <tab name="Messages">
        <table-component
          :data="messages"
          sort-by="createdAt"
          sort-order="desc"
        >
          <table-column show="firstname" label="First Name"></table-column>
          <table-column show="lastname" label="Last Name"></table-column>
          <table-column show="email" label="Email"></table-column>
          <table-column show="message" label="Message"></table-column>
          <table-column show="createdAt" label="Date"></table-column>
        </table-component>
      </tab>
      <tab name="Mailing List">
        <table-component
          :data="students"
          sort-by="createdAt"
          sort-order="desc"
        >
          <table-column show="firstname" label="First Name"></table-column>
          <table-column show="lastname" label="Last Name"></table-column>
          <table-column show="email" label="Email"></table-column>
          <table-column show="phone" label="Phone"></table-column>
          <table-column show="createdAt" label="Date"></table-column>
        </table-component>
      </tab>
    </tabs>
  </div>
</div>
</template>

<script>
import { db } from '../main'
import modal from './PaymentModal.vue'
export default {
  components: {
    modal
  },
  data () {
    return {
      isModalVisible: false,
      justPaid: {},
      students: [],
      applicants: [],
      teamInterest: [],
      messages: [],
      numberOfApps: 0,
      numberOfMAE: 0,
      numberOfEECS: 0,
      numberOfCE: 0,
      numberOfCHEM: 0
    }
  },
  methods: {
    refresh () {
      this.getStatistics()
      this.getApplicants()
      this.getTeamInterest()
    },
    getStatistics () {
      this.numberOfApps = 0
      this.numberOfMAE = 0
      this.numberOfEECS = 0
      this.numberOfCE = 0
      this.numberOfCHEM = 0
      this.students.forEach(function (student) {
        if (student.applicationSubmitted) {
          this.numberOfApps++
          if (['Aerospace', 'Mechanical', 'MAE'].indexOf(student.major) > -1) this.numberOfMAE++
          else if (['Computer Science and Engineering', 'Computer', 'Computer Science', 'Electrical'].indexOf(student.major) > -1) this.numberOfEECS++
          else if (['Civil', 'Environmental'].indexOf(student.major) > -1) this.numberOfCE++
          else if (['Biomedical', 'Chemical', 'Material Science'].indexOf(student.major) > -1) this.numberOfCHEM++
        }
      }.bind(this))
    },
    getApplicants () {
      this.applicants = []
      this.students.forEach(function (student) {
        if (student.applicationSubmitted) {
          this.applicants.push(student)
        }
      }.bind(this))
    },
    getTeamInterest () {
      this.teamInterest = []
      this.students.forEach(function (student) {
        if (student.teamInterest) {
          this.teamInterest.push(student)
        }
      }.bind(this))
    },
    rowClicked (rowData) {
      this.justPaid.email = rowData.data.email
      this.justPaid.firstname = rowData.data.firstname
      this.justPaid.lastname = rowData.data.lastname
      this.justPaid.paid = !rowData.data.paid
      db.collection('students').doc(this.justPaid.email).set(this.justPaid, { merge: true })
        .then(function () {
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
      this.showModal()
    },
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
      this.refresh()
    }
  },
  firestore () {
    return {
      students: db.collection('students'),
      messages: db.collection('messages')
    }
  }
}
</script>

<style scoped>
</style>

<template>
<div>
<link href="/../../static/table-component.css" rel="stylesheet">
<link href="/../../static/tabs-component.css" rel="stylesheet">

  <br/>
  <button :disabled="this.refreshDisabled" @click="refresh">Refresh</button>
  <button :disabled="this.$isAuthenticated()" @click="login">Login</button>
  <button :disabled="!this.$isAuthenticated()" @click="exportToSheets">Export</button>
  <button :disabled="!this.$isAuthenticated()" @click="balanceTeams">Balance Teams</button>
  <p>Venmo Password: {{ venmoPswd }}</p>
  <a href="https://console.developers.google.com/apis/credentials?project=engineering-conference&authuser=1">Google API Console</a>
  <a href="https://console.firebase.google.com/u/1/project/engineering-conference/database/firestore/data~2F">Cloud Firestore</a>
  <a href="https://webtask.io/make">Webtask Editor</a>
  <a href="https://dashboard.stripe.com/test/dashboard">Stripe Dashboard</a>

  <div>
    <tabs>
      <tab name="Applicants">
        <table-component
          :data="applicants"
          sort-by="createdAt"
          sort-order="desc"
        >
          <table-column show="firstname" label="First Name"></table-column>
          <table-column show="lastname" label="Last Name"></table-column>
          <table-column show="gender" label="Gender"></table-column>
          <table-column show="paid" label="Payment Method"></table-column>
          <table-column show="email" label="Email"></table-column>
          <table-column show="phone" label="Phone"></table-column>
          <table-column show="diet" label="Diet"></table-column>
          <table-column show="otherDiet" label="Other Diet"></table-column>
          <table-column show="school" label="School"></table-column>
          <table-column show="major" label="Major"></table-column>
          <table-column show="committee" label="Committee"></table-column>
          <table-column show="skills" label="Skills"></table-column>
          <table-column show="class" label="Class"></table-column>
          <table-column show="linkedin" label="LinkedIn"></table-column>
          <table-column show="message" label="Message For APP"></table-column>
          <table-column show="createdAt" label="Date"></table-column>
        </table-component>
      </tab>
      <tab name="Team Interest">
        <table-component
          :data="teamInterestList"
          sort-by="createdAt"
          sort-order="desc"
          @rowClick="downloadDocs"
        >
          <table-column show="firstname" label="First Name"></table-column>
          <table-column show="lastname" label="Last Name"></table-column>
          <table-column show="email" label="Email"></table-column>
          <table-column show="phone" label="Phone"></table-column>
          <table-column show="major" label="Major"></table-column>
          <table-column show="class" label="Class"></table-column>
          <table-column show="linkedin" label="LinkedIn"></table-column>
          <table-column show="position" label="Position"></table-column>
          <table-column show="subposition" label="Subposition"></table-column>
          <table-column show="hours" label="Hrs/Week"></table-column>
          <table-column show="interest" label="Interest"></table-column>
          <table-column show="qualifications" label="Qualifications"></table-column>
          <table-column show="availability" label="Availability"></table-column>
          <table-column show="createdAt" label="Date"></table-column>
        </table-component>
      </tab>
      <tab name="Statistics">
        <p>Applied: {{ numberOfApps }}</p>
        <div class="charts">
          <apexchart width="350px" type="pie" :options="majorChartOptions" :series="majorSeries"></apexchart>
          <apexchart width="350px" type="pie" :options="classChartOptions" :series="classSeries"></apexchart>
          <apexchart width="350px" type="pie" :options="committeeChartOptions" :series="committeeSeries"></apexchart>
          <apexchart width="350px" type="pie" :options="genderChartOptions" :series="genderSeries"></apexchart>
        </div>

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
          :data="mailingList"
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

<style>
  @import '../../static/style.css';
</style>

<script>
import { storage } from '../main'
const constants = require('../utils/constants.js')
const utils = require('../../src/utils/utils')
export default {
  data () {
    return {
      refreshDisabled: false,
      venmoPswd: process.env.VENMO_PSWD,
      justPaid: {},
      applicants: [],
      applicantsDict: {},
      teamInterestList: [],
      messages: [],
      mailingList: [],
      attendeeSheet: [constants.ATTENDEE_SHEET_ROW1],
      numberOfApps: 0,
      majorSeries: [0, 0, 0, 0, 0],
      majorChartOptions: {
        labels: ['MAE', 'EECS', 'CE', 'CBMS', 'OTHER'],
        title: {text: 'EC by Major', style: {color: '#3D3D3D'}}
      },
      classSeries: [0, 0, 0, 0, 0],
      classChartOptions: {
        labels: ['Fresh', 'Soph', 'Jun', 'Sen', 'SupSen'],
        title: {text: 'EC by Class', style: {color: '#3D3D3D'}}
      },
      committeeSeries: [0, 0, 0, 0],
      committeeChartOptions: {
        labels: ['Air Mover', 'Membrain', 'Pycontrol', 'Carbon Storer'],
        title: {text: 'EC by Committee', style: {color: '#3D3D3D'}}
      },
      genderSeries: [0, 0, 0],
      genderChartOptions: {
        labels: ['Male', 'Female', 'Other'],
        title: {text: 'EC by Gender', style: {color: '#3D3D3D'}}
      }
    }
  },
  methods: {
    /*
     * Counts up attendees by major and year then adds them to graphs,
     * Creates dict for team balancing and adds all attendees to an export sheet
     */
    async refresh () {
      try {
        this.refreshDisabled = true
        this.applicants = (await utils.httpGet('ecCollection', {Collection: '2019-2020 Attendees'})).ok.attendeeList
        this.getStatistics()
        this.getApplicants()
      } catch (e) {
        console.log(`Error: ${e}`)
      } finally {
        this.refreshDisabled = false
      }
    },
    /*
     * Logs into google api
     */
    login () {
      // TODO: Currently page needs refresh for export and team balance to be enabled
      if (this.$isAuthenticated() !== true) {
        this.$login()
      }
    },
    async downloadDocs (row) {
      await Promise.all([`resume/${row.data.email}-resume`, `transcript/${row.data.email}-transcript`].map(this.openURL))
    },
    async openURL (name) {
      try {
        const url = await storage.ref().child(name).getDownloadURL()
        window.open(url)
      } catch (err) { console.log(`Failed to open ${name} due to ${err.code}`) }
    },
    async exportToSheets () {
      try {
        const gapi = await this.$getGapiClient()
        this.writeToSpreadSheets(gapi, constants.GOOGLE_SHEETS.ATTENDEE_SHEET, 'A1', this.attendeeSheet)
      } catch (err) { console.log(`Google API Client ERROR: ${err}`) }
    },
    async balanceTeams () {
      try {
        const gapi = await this.$getGapiClient()
        const response = await gapi.client.sheets.spreadsheets.values.batchGet({
          spreadsheetId: constants.GOOGLE_SHEETS.ATTENDANCE_SHEET,
          ranges: 'Sheet1'
        })
        const result = response.result
        console.log(`${result.valueRanges.length} ranges retrieved.`)
        let majorFamilyCollection = {MAE: {}, EECS: {}, CEE: {}, CBMS: {}, OTHER: {}}
        for (let row of result.valueRanges[0].values) {
          if (row[0] === 'First Name') continue
          if (row[3] === 'TRUE' && this.applicantsDict[row[2]]) {
            let student = this.applicantsDict[row[2]]
            let majorFamily = this.convertMajorToFamily(student.major) // TODO: this will fail if other is returned
            majorFamilyCollection[majorFamily][student.email] = {
              firstname: student.firstname,
              lastname: student.lastname,
              class: student.class,
              major: student.major,
              skills: student.skills
            }
          }
        }

        // TODO: names in receiving sheet must match (CEE not CE)
        await Promise.all(Object.keys(constants.ENG_MAJORS).map(majorFamily => {
          let exportSheet = this.buildCommitteeSheet(this.sortByMajorClass(6, majorFamilyCollection[majorFamily], constants.ENG_MAJORS[majorFamily]))
          this.writeToSpreadSheets(gapi, constants.GOOGLE_SHEETS.TEAM_BALANCING_SHEET, majorFamily, exportSheet)
        }))
      } catch (err) { console.log(`Balance Teams Failed: ${err}`) }
    },
    sortByMajorClass (sizeOfCommittees, committee, majorsInCommittee) {
      let numberOfCommittees = parseInt(Object.keys(committee).length / sizeOfCommittees)
      if (numberOfCommittees === 0 && Object.keys(committee).length > 0) numberOfCommittees++
      let sortedMajors = this.sortedByMajor(committee, majorsInCommittee)
      for (let i = 0; i < sortedMajors; i++) sortedMajors[i] = this.sortedByClass(sortedMajors[i])
      let sortedMajorClass = this.concatArrays(sortedMajors)
      return this.createListFromSorted(sortedMajorClass, numberOfCommittees)
    },
    sortedByMajor (students, majors) {
      let major = []
      for (let i = 0; i < majors.length; i++) major.push([])
      for (let student in students) {
        for (let i = 0; i < majors.length; i++) {
          if (students[student].major === majors[i]) major[i].push(students[student])
        }
      }
      return major
    },
    sortedByClass (students) {
      let grade = [[], [], [], []]
      for (let student in students) {
        if (students[student].class === 'Freshman') grade[0].push(students[student])
        else if (students[student].class === 'Sophomore') grade[1].push(students[student])
        else if (students[student].class === 'Junior') grade[2].push(students[student])
        else grade[3].push(students[student])
      }
      // TODO: use lodash .flatten
      return this.concatArrays(grade)
    },
    concatArrays (arr) {
      let sortedTeam = arr[arr.length - 1]
      for (let i = arr.length - 2; i >= 0; i--) sortedTeam = sortedTeam.concat(arr[i])
      return sortedTeam
    },
    createListFromSorted (sortedList, committees) {
      let committeeList = []
      for (let i = 0; i < committees; i++) committeeList.push([])
      for (let i = 0; i < sortedList.length;) {
        for (let j = 0; j < committeeList.length; j++) {
          committeeList[j].push(sortedList[i + j])
        }
        i += committeeList.length
      }
      return committeeList
    },
    buildCommitteeSheet (committeeList) {
      let sheet = [constants.COMMITTEE_SHEET_ROW1]
      committeeList.map((currCommittee, idx) => {
        sheet.push([`Committee ${idx + 1}`, '', '', ''])
        currCommittee.filter(student => student).map(student => sheet.push([student.firstname, student.lastname, student.major, student.class]))
      })
      return sheet
    },
    async writeToSpreadSheets (gapi, spreadsheetId, range, values) {
      try {
        const response = await gapi.client.sheets.spreadsheets.values.batchUpdate({
          spreadsheetId: spreadsheetId,
          resource: {
            data: [{
              range: range,
              values: values
            }],
            valueInputOption: 'RAW'
          }
        })
        console.log(`${response.result.totalUpdatedCells} cells updated.`)
      } catch (err) { console.log(`Batch Update Failed: ${err}`) }
    },
    convertMajorToFamily (major) {
      return Object.keys(constants.ENG_MAJORS).filter(family => constants.ENG_MAJORS[family].includes(major))[0] || 'OTHER'
    },
    getStatistics () {
      this.numberOfApps = 0
      this.classSeries = new Array(5).fill(0)
      this.majorSeries = new Array(5).fill(0)
      this.committeeSeries = new Array(4).fill(0)
      this.genderSeries = new Array(3).fill(0)
      for (let student of this.applicants) {
        this.numberOfApps++
        const majorFamily = this.convertMajorToFamily(student.major)
        this.majorSeries[constants.SERIES_DATA.MAJOR_NUM[majorFamily]] += 1
        this.classSeries[constants.SERIES_DATA.CLASS_NUM[student.class]] += 1
        this.committeeSeries[constants.SERIES_DATA.COMMITTEE_NUM[student.committee]] += 1
        this.genderSeries[constants.SERIES_DATA.GENDER_NUM[student.gender]] += 1
      }
    },
    getApplicants () {
      this.applicantsDict = {}
      this.attendeeSheet = [constants.ATTENDEE_SHEET_ROW1]
      for (let student of this.applicants) {
        this.applicantsDict[student.email] = student
        this.attendeeSheet.push([student.firstname, student.lastname, student.email, student.gender, student.paid, student.phone, student.diet, student.otherDiet, student.school, student.major, student.committee, student.class, student.linkedin, student.message, student.createdAt])
      }
    }
  },
  firestore () {
    return {
      // applicants: db.collection('2019-2020 Attendees')
      // messages: db.collection('Messages'),
      // mailingList: db.collection('Mailing List'),
      // teamInterestList: db.collection('2019-2020 Team Interest List')
    }
  }
}
</script>

<style scoped>
  .charts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>

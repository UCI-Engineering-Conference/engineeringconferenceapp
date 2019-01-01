<template>
<div>
<link href="/../../static/table-component.css" rel="stylesheet">
<link href="/../../static/tabs-component.css" rel="stylesheet">

  <br/>
  <button @click="refresh">Refresh</button>
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
          <table-column show="paid" label="Payment Method"></table-column>
          <table-column show="email" label="Email"></table-column>
          <table-column show="phone" label="Phone"></table-column>
          <table-column show="diet" label="Diet"></table-column>
          <table-column show="otherDiet" label="Other Diet"></table-column>
          <table-column show="school" label="School"></table-column>
          <table-column show="major" label="Major"></table-column>
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
        <div class="charts">
          <apexchart width="350px" type="pie" :options="majorChartOptions" :series="majorSeries"></apexchart>
          <apexchart width="350px" type="pie" :options="classChartOptions" :series="classSeries"></apexchart>
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

<script>
import { db } from '../main'

export default {
  data () {
    return {
      venmoPswd: process.env.VENMO_PSWD,
      justPaid: {},
      applicants: [],
      applicantsDict: {},
      teamInterestList: [],
      messages: [],
      mailingList: [],
      attendeeSheet: [['First Name', 'Last Name', 'Email', 'Payment Method', 'Phone', 'Diet', 'Other Diet', 'School', 'Major', 'Skills', 'Class', 'LinkedIn', 'Message', 'Date']],
      numberOfApps: 0,
      majorSeries: [0, 0, 0, 0, 0],
      majorChartOptions: {
        labels: ['MAE', 'EECS', 'CE', 'CBMS', 'OTHER'],
        theme: {monochrome: {color: '#65D25C', enabled: true}},
        title: {text: 'EC by Major', style: {color: '#3D3D3D'}}
      },
      classSeries: [0, 0, 0, 0, 0],
      classChartOptions: {
        labels: ['Fresh', 'Soph', 'Jun', 'Sen', 'SupSen'],
        theme: {monochrome: {color: '#606060', enabled: true}},
        title: {text: 'EC by Class', style: {color: '#3D3D3D'}}
      }
    }
  },
  methods: {
    refresh () {
      /**
       * Counts up attendees by major and year then adds them to graphs,
       * Creates dict for team balancing and adds all attendees to a sheet
       * so they are ready for export
       */
      this.getStatistics()
      this.getApplicants()
    },
    login () {
      // TODO: Currently page needs refresh for export and team balance to be enabled
      if (this.$isAuthenticated() !== true) {
        this.$login()
      }
    },
    exportToSheets () {
      this.$getGapiClient()
        .then(gapi => {
          this.writeToSpreadSheets(gapi, '1YHuhH_LpC4XuaG2-uSgQFJaRE7QD1DLPLKLpEOiFHaQ', 'A1', this.attendeeSheet)
        })
    },
    balanceTeams () {
      this.$getGapiClient()
        .then(gapi => {
          gapi.client.sheets.spreadsheets.values.batchGet({
            spreadsheetId: '1L3ugTVFEfVQGNOZ8z-pMH10RFDkfYxfOjy9_nwba5WI',
            ranges: 'Sheet1'
          }).then((response) => {
            let result = response.result
            console.log(`${result.valueRanges.length} ranges retrieved.`)

            let MAE = {}
            let EECS = {}
            let CBMS = {}
            let CE = {}
            result.valueRanges[0].values.forEach(function (student) {
              if (student[0] !== 'First Name' && student[3] === 'TRUE') {
                if (['Aerospace', 'Mechanical', 'MAE'].indexOf(this.applicantsDict[student[2]].major) > -1) {
                  MAE[student[2]] = {
                    firstname: this.applicantsDict[student[2]].firstname,
                    lastname: this.applicantsDict[student[2]].lastname,
                    class: this.applicantsDict[student[2]].class,
                    major: this.applicantsDict[student[2]].major,
                    skills: this.applicantsDict[student[2]].skills
                  }
                }
                if (['Software Engineering', 'Computer Game Science', 'Computer Science and Engineering', 'Computer', 'Computer Science', 'Electrical'].indexOf(this.applicantsDict[student[2]].major) > -1) {
                  EECS[student[2]] = {
                    firstname: this.applicantsDict[student[2]].firstname,
                    lastname: this.applicantsDict[student[2]].lastname,
                    class: this.applicantsDict[student[2]].class,
                    major: this.applicantsDict[student[2]].major,
                    skills: this.applicantsDict[student[2]].skills
                  }
                }
                if (['Biomedical', 'Chemical', 'Material Science'].indexOf(this.applicantsDict[student[2]].major) > -1) {
                  CBMS[student[2]] = {
                    firstname: this.applicantsDict[student[2]].firstname,
                    lastname: this.applicantsDict[student[2]].lastname,
                    class: this.applicantsDict[student[2]].class,
                    major: this.applicantsDict[student[2]].major,
                    skills: this.applicantsDict[student[2]].skills
                  }
                }
                if (['Civil', 'Environmental'].indexOf(this.applicantsDict[student[2]].major) > -1) {
                  CE[student[2]] = {
                    firstname: this.applicantsDict[student[2]].firstname,
                    lastname: this.applicantsDict[student[2]].lastname,
                    class: this.applicantsDict[student[2]].class,
                    major: this.applicantsDict[student[2]].major,
                    skills: this.applicantsDict[student[2]].skills
                  }
                }
              }
            }.bind(this))

            let MAESheet = [['First Name', 'LastName', 'Major', 'Class']]
            let EECSSheet = [['First Name', 'LastName', 'Major', 'Class']]
            let CBMSSheet = [['First Name', 'LastName', 'Major', 'Class']]
            let CESheet = [['First Name', 'LastName', 'Major', 'Class']]

            for (let student in MAE) MAESheet.push([MAE[student].firstname, MAE[student].lastname, MAE[student].major, MAE[student].class])
            for (let student in EECS) EECSSheet.push([EECS[student].firstname, EECS[student].lastname, EECS[student].major, EECS[student].class])
            for (let student in CBMS) CBMSSheet.push([CBMS[student].firstname, CBMS[student].lastname, CBMS[student].major, CBMS[student].class])
            for (let student in CE) CESheet.push([CE[student].firstname, CE[student].lastname, CE[student].major, CE[student].class])

            this.writeToSpreadSheets(gapi, '1Aw62VGnf-6b2PlaEsLEi8-tPDnymyFah_bEgcQrmGaQ', 'MAE', MAESheet)
            this.writeToSpreadSheets(gapi, '1Aw62VGnf-6b2PlaEsLEi8-tPDnymyFah_bEgcQrmGaQ', 'EECS', EECSSheet)
            this.writeToSpreadSheets(gapi, '1Aw62VGnf-6b2PlaEsLEi8-tPDnymyFah_bEgcQrmGaQ', 'CBMS', CBMSSheet)
            this.writeToSpreadSheets(gapi, '1Aw62VGnf-6b2PlaEsLEi8-tPDnymyFah_bEgcQrmGaQ', 'CE', CESheet)
          })
        })
    },
    writeToSpreadSheets (gapi, spreadsheetId, range, values) {
      gapi.client.sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: spreadsheetId,
        resource: {
          data: [{
            range: range,
            values: values
          }],
          valueInputOption: 'RAW'
        }
      }).then((response) => {
        let result = response.result
        console.log(`${result.totalUpdatedCells} cells updated.`)
      })
    },
    getStatistics () {
      this.numberOfApps = 0
      this.classSeries = [0, 0, 0, 0, 0]
      this.majorSeries = [0, 0, 0, 0, 0]
      this.applicants.forEach(function (student) {
        this.numberOfApps++
        if (['Aerospace', 'Mechanical', 'MAE'].indexOf(student.major) > -1) ++this.majorSeries[0]
        else if (['Software Engineering', 'Computer Game Science', 'Computer Science and Engineering', 'Computer', 'Computer Science', 'Electrical'].indexOf(student.major) > -1) ++this.majorSeries[1]
        else if (['Civil', 'Environmental'].indexOf(student.major) > -1) ++this.majorSeries[2]
        else if (['Biomedical', 'Chemical', 'Material Science'].indexOf(student.major) > -1) ++this.majorSeries[3]
        else ++this.majorSeries[4]

        if (student.class === 'Freshman') ++this.classSeries[0]
        else if (student.class === 'Sophomore') ++this.classSeries[1]
        else if (student.class === 'Junior') ++this.classSeries[2]
        else if (student.class === 'Senior') ++this.classSeries[3]
        else if (student.class === 'Super Senior') ++this.classSeries[4]
      }.bind(this))
    },
    getApplicants () {
      this.applicantsDict = {}
      this.applicants.forEach(function (student) {
        this.applicantsDict[student.email] = student
        this.attendeeSheet.push([student.firstname, student.lastname, student.email, student.paid, student.phone, student.diet, student.otherDiet, student.school, student.major, 100, student.class, student.linkedin, student.message])//, student.createdAt])
      }.bind(this))
    }
  },
  firestore () {
    return {
      applicants: db.collection('2018-2019 Attendees'),
      messages: db.collection('Messages'),
      mailingList: db.collection('Mailing List'),
      teamInterestList: db.collection('2018-2019 Team Interest List')
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

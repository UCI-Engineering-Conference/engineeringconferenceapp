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
import { db, storage } from '../main'

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
        title: {text: 'EC by Major', style: {color: '#3D3D3D'}}
      },
      classSeries: [0, 0, 0, 0, 0],
      classChartOptions: {
        labels: ['Fresh', 'Soph', 'Jun', 'Sen', 'SupSen'],
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
    downloadDocs (row) {
      this.openURL(`resume/${row.data.email}-resume`)
      this.openURL(`transcript/${row.data.email}-transcript`)
    },
    openURL (name) {
      storage.ref().child(name).getDownloadURL().then(function (url) {
        // `url` is the download URL for 'images/stars.jpg'
        window.open(url)
      }).catch(function (error) {
        switch (error.code) {
          case 'storage/object-not-found': // File doesn't exist
            break
          case 'storage/unauthorized': // User doesn't have permission to access the object
            break
          case 'storage/canceled': // User canceled the upload
            break
        }
      })
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
              console.log(student[3])
              if (student[0] !== 'First Name' && student[3] === 'TRUE') {
                if (['Aerospace', 'Mechanical', 'MAE', 'Physics'].indexOf(this.applicantsDict[student[2]].major) > -1) {
                  MAE[student[2]] = {
                    firstname: this.applicantsDict[student[2]].firstname,
                    lastname: this.applicantsDict[student[2]].lastname,
                    class: this.applicantsDict[student[2]].class,
                    major: this.applicantsDict[student[2]].major,
                    skills: this.applicantsDict[student[2]].skills
                  }
                }
                if (this.applicantsDict[student[2]].school === 'Information and Computer Science' || ['Computer Science and Engineering', 'Computer', 'Electrical', 'CSE', 'Humanities-Undeclared', 'UNDERCLARED'].indexOf(this.applicantsDict[student[2]].major) > -1) {
                  EECS[student[2]] = {
                    firstname: this.applicantsDict[student[2]].firstname,
                    lastname: this.applicantsDict[student[2]].lastname,
                    class: this.applicantsDict[student[2]].class,
                    major: this.applicantsDict[student[2]].major,
                    skills: this.applicantsDict[student[2]].skills
                  }
                }
                if (['Biomedical', 'Chemical', 'Material Science', 'Chemistry', 'aerospace engineering', 'Mechanical engineering'].indexOf(this.applicantsDict[student[2]].major) > -1) {
                  CBMS[student[2]] = {
                    firstname: this.applicantsDict[student[2]].firstname,
                    lastname: this.applicantsDict[student[2]].lastname,
                    class: this.applicantsDict[student[2]].class,
                    major: this.applicantsDict[student[2]].major,
                    skills: this.applicantsDict[student[2]].skills
                  }
                }
                if (['Civil', 'Environmental', 'Applied Mathematics'].indexOf(this.applicantsDict[student[2]].major) > -1) {
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
            let MAESheet = this.writeToCommitteeSheet(this.sortByMajorClass(6, MAE, ['MAE', 'Aerospace', 'Mechanical', 'Physics']))
            let EECSSheet = this.writeToCommitteeSheet(this.sortByMajorClass(6, EECS, ['Electrical', 'Computer', 'Computer Science and Engineering', 'CSE', 'Software Engineering', 'Computer Game Science', 'Data Science', 'Informatics', 'Computer Science', 'Humanities-Undeclared', 'UNDERCLARED']))
            let CBMSSheet = this.writeToCommitteeSheet(this.sortByMajorClass(5, CBMS, ['Material Science', 'Chemical', 'Biomedical', 'Chemistry', 'aerospace engineering', 'Mechanical engineering']))
            let CESheet = this.writeToCommitteeSheet(this.sortByMajorClass(5, CE, ['Environmental', 'Civil', 'Applied Mathematics']))

            this.writeToSpreadSheets(gapi, '1Aw62VGnf-6b2PlaEsLEi8-tPDnymyFah_bEgcQrmGaQ', 'MAE', MAESheet)
            this.writeToSpreadSheets(gapi, '1Aw62VGnf-6b2PlaEsLEi8-tPDnymyFah_bEgcQrmGaQ', 'EECS', EECSSheet)
            this.writeToSpreadSheets(gapi, '1Aw62VGnf-6b2PlaEsLEi8-tPDnymyFah_bEgcQrmGaQ', 'CBMS', CBMSSheet)
            this.writeToSpreadSheets(gapi, '1Aw62VGnf-6b2PlaEsLEi8-tPDnymyFah_bEgcQrmGaQ', 'CE', CESheet)
          })
        })
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
      // let sortedTeam = major[major.length - 1]
      // for (let i = major.length - 2; i >= 0; i--) sortedTeam = sortedTeam.concat(major[i])
      // return sortedTeam
    },
    sortedByClass (students) {
      let grade = [[], [], [], []]
      for (let student in students) {
        if (students[student].class === 'Freshman') grade[0].push(students[student])
        else if (students[student].class === 'Sophomore') grade[1].push(students[student])
        else if (students[student].class === 'Junior') grade[2].push(students[student])
        else grade[3].push(students[student])
      }
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
    writeToCommitteeSheet (committeeList) {
      let sheet = [['First Name', 'LastName', 'Major', 'Class']]
      for (let i = 0; i < committeeList.length; i++) {
        sheet.push(['Committee '.concat((i + 1).toString()), ' ', '', ''])
        for (let j = 0; j < committeeList[i].length; j++) {
          if (committeeList[i][j] === undefined) break
          sheet.push([committeeList[i][j].firstname, committeeList[i][j].lastname, committeeList[i][j].major, committeeList[i][j].class])
        }
      }
      return sheet
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
        else if (student.school === 'Information and Computer Science' || ['CSE', 'Software Engineering', 'Computer Game Science', 'Computer Science and Engineering', 'Computer', 'Computer Science', 'Electrical'].indexOf(student.major) > -1) ++this.majorSeries[1]
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
      this.attendeeSheet = [['First Name', 'Last Name', 'Email', 'Payment Method', 'Phone', 'Diet', 'Other Diet', 'School', 'Major', 'Skills', 'Class', 'LinkedIn', 'Message', 'Date']]
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
      teamInterestList: db.collection('2019-2020 Team Interest List')
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

const ATTENDEE_SHEET_ROW1 = ['First Name', 'Last Name', 'Email', 'Payment Method', 'Phone', 'Diet', 'Other Diet', 'School', 'Major', 'Skills', 'Class', 'LinkedIn', 'Message', 'Date']
const COMMITTEE_SHEET_ROW1 = ['First Name', 'LastName', 'Major', 'Class']
const GOOGLE_SHEETS = Object.freeze({
  ATTENDEE_SHEET: '1YHuhH_LpC4XuaG2-uSgQFJaRE7QD1DLPLKLpEOiFHaQ',
  ATTENDANCE_SHEET: '1L3ugTVFEfVQGNOZ8z-pMH10RFDkfYxfOjy9_nwba5WI',
  TEAM_BALANCING_SHEET: '1Aw62VGnf-6b2PlaEsLEi8-tPDnymyFah_bEgcQrmGaQ'
})

const ENG_MAJORS = Object.freeze({
  EECS: [
    'Business Information Management', 'Computer Game Science', 'Computer Science', 'Computer Science and Engineering',
    'Data Science', 'Informatics', 'Software Engineering', 'Electrical', 'Computer'
  ],
  MAE: ['Mechanical', 'Aerospace', 'MAE'],
  CEE: ['Civil', 'Environmental'],
  CBMS: ['Chemical', 'Biomedical', 'Material Science']
})

const MAJOR_NUM = Object.freeze({
  MAE: 0,
  EECS: 1,
  CEE: 2,
  CBMS: 3,
  OTHER: 4
})

const CLASS_NUM = Object.freeze({
  'Freshman': 0,
  'Sophomore': 1,
  'Junior': 2,
  'Senior': 3,
  'Super Senior': 4
})

const SERIES_DATA = Object.freeze({
  CLASS_NUM,
  MAJOR_NUM
})

const FIREBASE_COLLECTIONS = Object.freeze({
  ATTENDEES: '2019-2020 Attendees',
  MAILING_LIST: 'Mailing List'
})

export {
  ATTENDEE_SHEET_ROW1,
  COMMITTEE_SHEET_ROW1,
  GOOGLE_SHEETS,
  ENG_MAJORS,
  SERIES_DATA,
  FIREBASE_COLLECTIONS
}

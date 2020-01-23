//  curl -d '{"applicant": {"firstname": "Nik", "lastname": "Hammon", "email": "nhammon@uci.edu", "phone": "8192587833", "createdAt": "09-01-2019", "stripeToken": "tok_visa", "paid": "CARD"}, "CONFIG": {"CONFERENCE_DATE": "09/01", "TICKET_PRICE": "2605"}, "FIREBASE_COLLECTIONS": {"ATTENDEES": "2019-2020 Attendees", "MAILING_LIST": "Mailing List"}}' -H "Content-Type: application/json" -X POST https://wt-ec93f04fb278b9f3f2b7a660e2425240-0.sandbox.auth0-extend.com/applicationSubmission
/* eslint semi: "error" */

const utils = require('./helpers');
const emailBuilder = require('./emailBuilder');
const constants = require('./constants.js');

const createAttendee = async (body, secrets) => {
  try {
    const {applicant, CONFIG, FIREBASE_COLLECTIONS} = body;
    const db = utils.initializeDB(secrets);
    const {valid, message} = await utils.existsInFirebase(db, applicant, FIREBASE_COLLECTIONS.ATTENDEES);
    if (!valid) {
      return {invalid: {msg: message}};
    }
    if (applicant.paid === 'CARD') await utils.createStripeCharge(secrets, applicant, CONFIG);
    await utils.sendEmail(secrets, applicant, constants.ATTENDEE_EMAIL_SUBJECT, emailBuilder.attendeeEmail(applicant.firstname, applicant.lastname, CONFIG));
    await utils.createFirebaseDoc(secrets, db, applicant, FIREBASE_COLLECTIONS.ATTENDEES, FIREBASE_COLLECTIONS.MAILING_LIST);
  } catch (err) {
    return {error: {msg: `ERROR: ${err}`}};
  }
  return {ok: {msg: 'Successfully submitted application'}};
};

const createTeamApplicant = async (body, secrets) => {
  try {
    const {applicant, CONFIG, FIREBASE_COLLECTIONS} = body;
    const db = utils.initializeDB(secrets);
    await utils.createFirebaseDoc(secrets, db, applicant, FIREBASE_COLLECTIONS.TEAM_INTEREST_LIST, FIREBASE_COLLECTIONS.MAILING_LIST);
  } catch (err) {
    return {error: {msg: `ERROR: ${err}`}};
  }
  return {ok: {msg: 'Successfully submitted application'}};
};

const createContactMessage = async (body, secrets) => {
  try {
    const {applicant, CONFIG, FIREBASE_COLLECTIONS} = body;
    const db = utils.initializeDB(secrets);
    await utils.addSingleDocToFirebase(secrets, db, applicant, FIREBASE_COLLECTIONS.MESSAGES);
  } catch (err) {
    return {error: {msg: `ERROR: ${err}`}};
  }
  return {ok: {msg: 'Successfully submitted application'}};
};

const retrieveFirebaseCollection = async (query, secrets) => {
  let attendeeList;
  try {
    const db = utils.initializeDB(secrets);
    attendeeList = await utils.getFirebaseCollection(secrets, db, query.Collection);
  } catch (err) {
    return { error: {msg: `ERROR: ${err}`}};
  }
  return {ok: {msg: 'Successfully retrieved applicant list', attendeeList }};
};

module.exports = {
  createAttendee,
  createTeamApplicant,
  createContactMessage,
  retrieveFirebaseCollection
};

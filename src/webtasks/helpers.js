const firebase = require('firebase')
let FIREBASE_CONFIG = { // apiKey is added later as a secret
  authDomain: 'engineering-conference.firebaseapp.com',
  databaseURL: 'https://engineering-conference.firebaseio.com',
  projectId: 'engineering-conference',
  storageBucket: 'engineering-conference.appspot.com',
  messagingSenderId: '436441711018'
}
const stripe = require('stripe')
const sendgrid = require('sendgrid')
const helper = sendgrid.mail

const constants = require('./constants')

const initializeDB = (secrets) => {
  FIREBASE_CONFIG['apiKey'] = secrets.FIREBASE_API_KEY
  const firebaseApp = (!firebase.apps.length) ? firebase.initializeApp(FIREBASE_CONFIG) : firebase.apps[0]
  return firebaseApp.firestore()
}

const addSingleDocToFirebase = async (secrets, db, doc, collection) => {
  console.log('Creating document in firebase..')
  await firebase.auth().signInWithEmailAndPassword(constants.EC_EMAIL, secrets.EC_PASSWORD)
  doc = clean(doc)
  await db.collection(collection).add(doc)
}

const getFirebaseCollection = async (secrets, db, collection) => {
  console.log('Retriveing collection from firebase..');
  const snapshot = await db.collection(collection).get();
  return snapshot.docs.map(doc => doc.data());
};

const getFirebaseCollection = async (secrets, db, collection) => {
  console.log('Retriveing collection from firebase..');
  const snapshot = await db.collection(collection).get();
  return snapshot.docs.map(doc => doc.data()); 
};

const createFirebaseDoc = async (secrets, db, applicant, collection, mailingListCollection) => {
  console.log('Creating documents in firebase..')
  await firebase.auth().signInWithEmailAndPassword(constants.EC_EMAIL, secrets.EC_PASSWORD)
  let mailingListApplicant = {
    firstname: applicant.firstname,
    lastname: applicant.lastname,
    email: applicant.email,
    phone: applicant.phone,
    createdAt: applicant.createdAt
  }
  applicant = clean(applicant)
  mailingListApplicant = clean(mailingListApplicant)
  await db.collection(collection).doc(applicant.email).set(applicant, { merge: true })
  await db.collection(mailingListCollection).doc(applicant.email).set(mailingListApplicant, { merge: true })
}

const createStripeCharge = async (secrets, applicant, CONFIG) => {
  console.log('Creating Stripe Charge..')
  const customerCreateParams = {
    email: applicant.email,
    source: applicant.stripeToken
  }

  const stripeCustomer = await stripe(secrets.STRIPE_SECRET_KEY).customers.create(customerCreateParams)

  const chargeCreateParams = {
    amount: CONFIG.TICKET_PRICE,
    currency: constants.STRIPE_CURRENCY,
    customer: stripeCustomer.id,
    description: constants.STRIPE_DESCRIPTION
  }
  await stripe(secrets.STRIPE_SECRET_KEY).charges.create(chargeCreateParams)
}

const sendEmail = async (secrets, applicant, subject, emailBody) => {
  console.log('Sending Applicant Email..')
  const mail = new helper.Mail(
    new helper.Email(constants.EC_EMAIL),
    subject,
    new helper.Email(applicant.email),
    new helper.Content('text/html', emailBody)
  )
  const sg = sendgrid(secrets.SENDGRID_API_KEY)
  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  })
  await sg.API(request)
}

const clean = (doc) => {
  Object.keys(doc).filter(propName => !doc[propName])
    .map(propName => delete doc[propName])
  return doc
}

const existsInFirebase = async (db, applicant, collection) => {
  console.log('Validating Input..')
  const doc = await db.collection(collection).doc(applicant.email).get()
  if (doc.exists) {
    return {valid: false, message: 'You have already registered for Engineering Conference'}
  }
  return {valid: true, message: ''}
}

module.exports = {
  initializeDB,
  addSingleDocToFirebase,
  getFirebaseCollection,
  createFirebaseDoc,
  sendEmail,
  createStripeCharge,
  existsInFirebase
}

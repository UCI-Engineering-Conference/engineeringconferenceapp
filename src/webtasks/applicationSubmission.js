// test: wt create applicationSubmission.js -s STRIPE_SECRET_KEY=sk_test_1ahZKHfOFP9F46qtDuvWIG13 -s SENDGRID_API_KEY=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 -s FIREBASE_API_KEY=AIzaSyAa84HFXn_wl20ORM4HlfgXRMOo4U2gFAo
//  curl -d '{"applicant": {"firstname": "Nik", "lastname": "Hammon", "email": "nhammon@uci.edu", "phone": "8192587833", "createdAt": "09-01-2019", "stripeToken": "tok_visa", "paid": "CARD"}, "CONFIG": {"CONFERENCE_DATE": "09/01", "TICKET_PRICE": "2605"}, "FIREBASE_COLLECTIONS": {"ATTENDEES": "2019-2020 Attendees", "MAILING_LIST": "Mailing List"}}' -H "Content-Type: application/json" -X POST https://wt-ec93f04fb278b9f3f2b7a660e2425240-0.sandbox.auth0-extend.com/applicationSubmission
/* eslint semi: "error" */
'use latest';

const firebase = require('firebase');
let FIREBASE_CONFIG = { // apiKey is added later as a secret
  authDomain: 'engineering-conference.firebaseapp.com',
  databaseURL: 'https://engineering-conference.firebaseio.com',
  projectId: 'engineering-conference',
  storageBucket: 'engineering-conference.appspot.com',
  messagingSenderId: '436441711018'
};
const stripe = require('stripe');
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const EC_EMAIL = 'EngineeringConferenceUCI@gmail.com';
const EMAIL_SUBJECT = 'UCI Engineering Conference (1 ticket purchased)';
const STRIPE_CURRENCY = 'usd';
const STRIPE_DESCRIPTION = 'Engineering Conference (1 ticket)';

const applicationSubmissionHandler = async (ctx, cb) => {
  let response = await submitApplication(ctx);
  if (response.invalid) {
    cb(null, {status: 400, msg: response.invalid.msg});
  } else if (response.error) {
    cb(null, {status: 500, msg: response.error.msg});
  } else {
    cb(null, {status: 200, msg: response.ok.msg});
  }
};

const submitApplication = async (ctx) => {
  console.log('Attempting to submit an application..');
  try {
    const {applicant, CONFIG, FIREBASE_COLLECTIONS} = JSON.parse(ctx.body_raw);
    const db = intializeDB(ctx);
    const {valid, message} = await validateInput(db, applicant, FIREBASE_COLLECTIONS);
    if (!valid) {
      return {invalid: {msg: message}};
    }
    if (applicant.paid === 'CARD') await createStripeCharge(ctx, applicant, CONFIG);
    await sendEmail(ctx, applicant, CONFIG);
    await addApplicantToFirebase(db, applicant, FIREBASE_COLLECTIONS);
  } catch (err) {
    return {error: {msg: `ERROR: ${err}`}};
  }
  return {ok: {msg: 'Successfully submitted application'}};
};

const intializeDB = (ctx) => {
  FIREBASE_CONFIG['apiKey'] = ctx.secrets.FIREBASE_API_KEY;
  const firebaseApp = (!firebase.apps.length) ? firebase.initializeApp(FIREBASE_CONFIG) : firebase.apps[0];
  return firebaseApp.firestore();
};

const addApplicantToFirebase = async (db, applicant, collections) => {
  console.log('Adding Applicant to Firebase');
  let mailingListApplicant = {
    firstname: applicant.firstname,
    lastname: applicant.lastname,
    email: applicant.email,
    phone: applicant.phone,
    createdAt: applicant.createdAt
  };
  applicant = clean(applicant);
  mailingListApplicant = clean(mailingListApplicant);
  await db.collection(collections.ATTENDEES).doc(applicant.email).set(applicant, { merge: true });
  await db.collection(collections.MAILING_LIST).doc(applicant.email).set(mailingListApplicant, { merge: true });
};

const createStripeCharge = async (ctx, applicant, CONFIG) => {
  console.log('Creating Stripe Charge');
  const customerCreateParams = {
    email: applicant.email,
    source: applicant.stripeToken
  };

  const stripeCustomer = await stripe(ctx.secrets.STRIPE_SECRET_KEY).customers.create(customerCreateParams);

  const chargeCreateParams = {
    amount: CONFIG.TICKET_PRICE,
    currency: STRIPE_CURRENCY,
    customer: stripeCustomer.id,
    description: STRIPE_DESCRIPTION
  };
  await stripe(ctx.secrets.STRIPE_SECRET_KEY).charges.create(chargeCreateParams);
};

const buildEmailBody = (firstname, lastname, CONFIG) => {
  return `
  <div style="text-align:center">
    <img alt="Engineering Conference" style="widinvali://wt-ec93f04fb278b9f3f2b7a660e2425240-0.sandbox.auth0-extend.com/applicationSubmissionth:50%;" src="http://www.engineeringconferenceuci.com/static/img/thumbnail.png" />
  </div>
  <div style="padding:5px;margin-top:10px;background-color: #65D25C;">
  </div>
  <p><b>Amazing,</b></p>
  <p>This is the official ticket receipt for <b>${firstname} ${lastname}</b> to attend Engineering Conference on <b>${CONFIG.CONFERENCE_DATE}</b>.</p>
  <p></p>
  <p>Cheers,</p>
  <p><b>UCI Engineering Conference</b></p>
  <div style="background-color: #65D25C;padding: 20px;color: #FFFFFF; text-align:center">
    <a href="https://www.facebook.com/EConferenceUCI"><img alt="Facebook" style="display:inline-block; padding:10px;width:25px;" src="https://cdn4.iconfinder.com/data/icons/social-media-outline-3/60/Social-01-Facebook-Outline-128.png" /></a>
    <a href="https://twitter.com/@EConferenceUCI"><img alt="Twitter" style="display:inline-block; padding:10px;width:25px;" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-twitter-outline-128.png" /></a>
    <a href="https://instagram.com/EConferenceUCI"><img alt="Instagram" style="display:inline-block; padding:10px;width:25px;" src="https://cdn4.iconfinder.com/data/icons/materia-social-free/24/038_011_instagram_mobile_photo_network_android_material-128.png" /></a>
  </div>`;
};

const sendEmail = async (ctx, applicant, CONFIG) => {
  console.log('Sending Applicant Email');
  const mail = new helper.Mail(
    new helper.Email(EC_EMAIL),
    EMAIL_SUBJECT,
    new helper.Email(applicant.email),
    new helper.Content('text/html', buildEmailBody(applicant.firstname, applicant.lastname, CONFIG))
  );
  const sg = sendgrid(ctx.secrets.SENDGRID_API_KEY);
  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });
  await sg.API(request);
};

const validateInput = async (db, applicant, collections) => {
  console.log('Validating Input..');
  const doc = await db.collection(collections.ATTENDEES).doc(applicant.email).get();
  if (doc.exists) {
    return {valid: false, message: 'You have already registered for Engineering Conference'};
  }
  return {valid: true, message: ''};
};

const clean = (doc) => {
  Object.keys(doc).filter(propName => !doc[propName])
    .map(propName => delete doc[propName]);
  return doc;
};

module.exports = applicationSubmissionHandler;

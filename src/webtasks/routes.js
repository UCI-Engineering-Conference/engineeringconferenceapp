// ./routes.js

const models = require('./models');
module.exports = async (app) => {
  app.post('/attendeeApp', async (req, res) => {
    console.log('Attempting to create attendee..');
    const response = await models.createAttendee(req.body, req.webtaskContext.secrets);
    const responseCode = response.error ? 500 : response.invalid ? 400 : 200;
    res.status(responseCode).send(response);
  });
  
  app.post('/teamApp', async (req, res) => {
    console.log('Attempting to create team applicant..');
    const response = await models.createTeamApplicant(req.body, req.webtaskContext.secrets);
    const responseCode = response.error ? 500 : response.invalid ? 400 : 200;
    res.status(responseCode).send(response);
  });

  app.post('/contactMessage', async (req, res) => {
    console.log('Attempting to create contact message..');
    const response = await models.createContactMessage(req.body, req.webtaskContext.secrets);
    const responseCode = response.error ? 500 : response.invalid ? 400 : 200;
    res.status(responseCode).send(response);
  });
  
  app.get('/ecCollection', async (req, res) => {
    console.log('Attempting to retrieve applicants..');
    const response = await models.retrieveFirebaseCollection(req.query, req.webtaskContext.secrets);
    const responseCode = response.error ? 500 : response.invalid ? 400 : 200;
    res.status(responseCode).send(response);
  });
};


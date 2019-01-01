// wt create stripecharge.js --secret stripeSecretKey=sk_test_1ahZKHfOFP9F46qtDuvWIG13 --dependency stripe@6.19.0 --dependency express@4.9.8 --dependency webtask-tools@3.4.0 --dependency body-parser@1.8.4
'use latest';

import express from 'express';
import { fromExpress } from 'webtask-tools';
import bodyParser from 'body-parser';
import stripe from 'stripe';

bodyParser.urlencoded();

var app = express();
app.use(bodyParser.urlencoded());

app.post('/payment', (req, res) => {
  var ctx = req.webtaskContext;
  var STRIPE_SECRET_KEY = ctx.secrets.stripeSecretKey;

  stripe(STRIPE_SECRET_KEY).customers.create({
    email: req.body.email,
    source: req.body.stripeToken
  }).then((customer) => {
    return stripe(STRIPE_SECRET_KEY).charges.create({
      amount: '2603',
      currency: 'usd',
      customer: customer.id,
      description: "Engineering Conference (1 ticket)"
    });
  }).then((charge) => {
    res.end();
  }).catch((err) => {
    const status = err ? 400 : 200;
    const message = err ? err.message : 'Payment done!';
    res.writeHead(status, { 'Content-Type': 'text/html' });
    return res.end('<h1>' + message + '</h1>');
  });
});

module.exports = fromExpress(app);

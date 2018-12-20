<?php
  require_once('vendor/autoload.php');

  \Stripe\Stripe::setApiKey('sk_test_1ahZKHfOFP9F46qtDuvWIG13');

  $POST = filter_var_array($POST, FILTER_SANITIZE_STRING);

  $token = $POST['stripeToken'];

  $customer = \Stripe\Customer::create(array(
    "source" => token
  ));

  $charge = \Stripe\Charge::create(array(
    "amount" => 2500,
    "currency" => "usd",
    "description" => "EC Ticket",
    'customer' => $customer->id
  ));

  print_r($charge);

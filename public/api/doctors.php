<?php
// This file runs on the same site as the website.
// The browser talks to /api/doctors, and this script asks the real API for the list.
header('Content-Type: application/json; charset=utf-8');

$curl = curl_init('https://demo.orvenahealth.com/appservice.asmx/getdoctorlist');
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, '{}');
curl_setopt($curl, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_TIMEOUT, 30);

$result = curl_exec($curl);
curl_close($curl);

if ($result === false) {
  http_response_code(502);
  echo '{"d":"[]"}';
  exit;
}

echo $result;

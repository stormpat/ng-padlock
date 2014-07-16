<?php

/**
 * A very naive serverside auth. This is basically just to get
 * some kind of headers from the server for testing. In you serverside app you just need
 * to return the correct headers:
 *
 * 200 OK
 * 401 Unauthorized.
 *
 * Never use any of the code below in your production app.
 *
 * @see: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
 */

function naiveAuth() {
  if (
      $_GET['username'] === "username" &&
      $_GET['password'] === "password"
    )
  {
    header('Content-Type: application/json');
    header("HTTP/1.1 200 OK");
    echo json_encode([
      'data' => 'success',
      'message' => 'You are registered',
      'user' => $_GET['username'],
      'pass' => $_GET['password'],
    ]);
  }
  else
  {
    header('Content-Type: application/json');
    header("HTTP/1.1 401 Unauthorized");
    echo json_encode([
      'data' => 'failed',
      'message' => 'You need to register'
    ]);
  }
}

naiveAuth();

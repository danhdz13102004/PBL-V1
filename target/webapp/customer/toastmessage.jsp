<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Toast Message UI</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Varela+Round&display=swap"
    rel="stylesheet">
  <link rel="shortcut icon" href="assets/image/logo.ico" type="image/x-icon">
  <link rel="stylesheet" href="../css/normalize.css">
  <link rel="stylesheet" href="../css/base.css">
  <link rel="stylesheet" href="../css/toastmessage.css">
</head>

<body>
  <div id="toast">
  </div>
  <button class="button" id="btnErr">Show Error</button>
  <button class="button" id="btnSuc">Show Success</button>

  <script src="../js/toastmessage.js"></script>
</body>

</html>
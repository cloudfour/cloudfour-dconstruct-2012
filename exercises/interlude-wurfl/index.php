<?php require_once('zombie-detect.php'); ?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  
<title>Device Detection!</title>
</head>
<body>
<h1><strike>Device</strike> Zombie Detection</h1>

<h2 id="wurfl">Current User Agent/Device/Browser: WURFL</h2>

<ul>
<li><?php print $is_phone_like; ?></li>
<li><?php print $is_touch; ?></li>
<li><?php print $client->getDeviceCapability('id'); ?></li>
</ul>



</body>
</html>
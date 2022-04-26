<?php
   ini_set('display_errors', 1);
   ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);
  if(session_status()==PHP_SESSION_NONE){
  session_start();
  }

require_once dirname(dirname(__FILE__))."/config/constantes.php";

require_once dirname(dirname(__FILE__))."/config/validator.php";

require_once dirname(dirname(__FILE__))."/config/orm.php";

require_once dirname(dirname(__FILE__))."/config/router.php"; 

//require_once dirname(dirname(__FILE__))."/data/db.json"; 
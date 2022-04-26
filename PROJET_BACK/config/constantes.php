<?php

define("ROOT",str_replace("public".DIRECTORY_SEPARATOR."index.php","",$_SERVER['SCRIPT_FILENAME']));

define("PATH_SRC",ROOT."src".DIRECTORY_SEPARATOR);

define("PATH_VIEWS",ROOT."templates".DIRECTORY_SEPARATOR);

define("PATH_DB",ROOT."data/db.json");

define("WEB_ROOT","http://localhost:8000/");

define("WEB_PUBLIC",str_replace("index.php","",$_SERVER['SCRIPT_FILENAME']));
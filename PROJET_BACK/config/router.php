<?php

if(isset($_REQUEST['controller']) ){
        switch ($_REQUEST['controller']) {
                case "tache" :
                require_once(PATH_SRC."controllers/tacheController.php");
                break;
        }
}
    
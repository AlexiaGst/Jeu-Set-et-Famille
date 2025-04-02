<?php

$host = "localhost";
$login = "root";
$pass = "";
$bdname = "jeu-set-et-famille";

$bdd = mysqli_connect($host, $login, $pass, $bdname);

if ($bdd)

{
}

else

    {
        echo "Connexion non-reussite";
    }

mysqli_set_charset($bdd,"utf8");
?>

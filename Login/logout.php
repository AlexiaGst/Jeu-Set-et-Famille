<?php

    session_start();

    session_destroy();

    unset($_SESSION);

    echo "<script>alert('Vous avez été déconnecté du site');</script>";
    header("Refresh: 0; URL='../index.php'");

?>
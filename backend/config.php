<?php
define('DB_HOST', '127.0.0.1');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'decorador_ambientes');
define('DB_CHARSET', 'utf8');

function getDBCon() {
    $conexion_sistema = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if (!$conexion_sistema) {
        die("Error de conexión a la base de datos: " . mysqli_connect_error());
    }

    mysqli_set_charset($conexion_sistema, DB_CHARSET);

    return $conexion_sistema;
}

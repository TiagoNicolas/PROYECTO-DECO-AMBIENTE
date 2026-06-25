<?php
require_once '../cors.php';
require_once '../config.php';

$conexion = getDBCon();
$metodo = $_SERVER['REQUEST_METHOD'];

switch ($metodo) {

    // GET MOBILIARIO
    case 'GET':
        $resultado = mysqli_query($conexion, "SELECT * FROM mobiliario");

        if (!$resultado) {
            http_response_code(500);
            echo json_encode(["error" => mysqli_error($conexion)]);
            break;
        }

        $mobiliario = [];
        while ($fila = mysqli_fetch_assoc($resultado)) {
            $mobiliario[] = $fila;
        }

        echo json_encode($mobiliario);
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}

mysqli_close($conexion);

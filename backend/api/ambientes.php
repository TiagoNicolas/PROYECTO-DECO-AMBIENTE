<?php
require_once '../cors.php';
require_once '../config.php';

$conexion = getDBCon();
$metodo = $_SERVER['REQUEST_METHOD'];

switch ($metodo) {

    case 'GET':
        $resultado = mysqli_query($conexion, "SELECT * FROM ambientes");

        if (!$resultado) {
            http_response_code(500);
            echo json_encode(["error" => mysqli_error($conexion)]);
            break;
        }

        $ambientes = [];
        while ($fila = mysqli_fetch_assoc($resultado)) {
            $ambientes[] = $fila;
        }

        echo json_encode($ambientes);
        break;

case 'POST':
    $datos = json_decode(file_get_contents("php://input"), true);

    $nombre = $datos['nombre'];
    $tipo = $datos['tipo'];
    $metros_cuadrados = $datos['metros_cuadrados'];
    $cantidad_muebles = $datos['cantidad_muebles'];
    $estado = $datos['estado'];

    $stmt = mysqli_prepare(
        $conexion,
        "INSERT INTO ambientes (nombre, tipo, metros_cuadrados, cantidad_muebles, estado) VALUES (?, ?, ?, ?, ?)"
    );
    mysqli_stmt_bind_param($stmt, "ssisi", $nombre, $tipo, $metros_cuadrados, $cantidad_muebles, $estado);

    if (!mysqli_stmt_execute($stmt)) {
        http_response_code(500);
        echo json_encode(["error" => mysqli_stmt_error($stmt)]);
        break;
    }

    echo json_encode(["mensaje" => "Ambiente agregado", "id" => mysqli_insert_id($conexion)]);
    break;

    case 'PUT':
        $id = $_GET['id'];

        $datos = json_decode(file_get_contents("php://input"), true);

        $nombre = $datos['nombre'];
        $tipo = $datos['tipo'];
        $metros_cuadrados = $datos['metros_cuadrados'];
        $cantidad_muebles = $datos['cantidad_muebles'];
        $estado = $datos['estado'];

        $stmt = mysqli_prepare(
            $conexion,
            "UPDATE ambientes SET nombre=?, tipo=?, metros_cuadrados=?, cantidad_muebles=?, estado=? WHERE id=?"
        );
        mysqli_stmt_bind_param($stmt, "ssdisi", $nombre, $tipo, $metros_cuadrados, $cantidad_muebles, $estado, $id);

        if (!mysqli_stmt_execute($stmt)) {
            http_response_code(500);
            echo json_encode(["error" => mysqli_stmt_error($stmt)]);
            break;
        }

        echo json_encode(["mensaje" => "Ambiente actualizado"]);
        break;

    case 'DELETE':
        $id = $_GET['id'];

        $stmt = mysqli_prepare($conexion, "DELETE FROM ambientes WHERE id=?");
        mysqli_stmt_bind_param($stmt, "i", $id);

        if (!mysqli_stmt_execute($stmt)) {
            http_response_code(500);
            echo json_encode(["error" => mysqli_stmt_error($stmt)]);
            break;
        }

        echo json_encode(["mensaje" => "Ambiente eliminado"]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}

mysqli_close($conexion);

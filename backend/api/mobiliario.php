<?php
require_once '../cors.php';
require_once '../config.php';

$conexion = getDBCon();
$metodo = $_SERVER['REQUEST_METHOD'];

switch ($metodo) {

    case 'GET':
        $resultado = mysqli_query($conexion, "SELECT * FROM mobiliario");
        if (!$resultado) { http_response_code(500); echo json_encode(["error" => mysqli_error($conexion)]); break; }
        $mobiliario = [];
        while ($fila = mysqli_fetch_assoc($resultado)) $mobiliario[] = $fila;
        echo json_encode($mobiliario);
        break;

    case 'POST':
        $datos = json_decode(file_get_contents("php://input"), true);
        $stmt = mysqli_prepare($conexion,
            "INSERT INTO mobiliario (nombre, categoria, ambiente, material, precio) VALUES (?, ?, ?, ?, ?)");
        mysqli_stmt_bind_param($stmt, "ssssd",
            $datos['nombre'], $datos['categoria'], $datos['ambiente'], $datos['material'], $datos['precio']);
        if (!mysqli_stmt_execute($stmt)) 
            { http_response_code(500); echo json_encode(["error" => mysqli_stmt_error($stmt)]); break; }
        echo json_encode(["mensaje" => "Mueble agregado", "id" => mysqli_insert_id($conexion)]);
        break;

    case 'PUT':
        $id = $_GET['id'];
        $datos = json_decode(file_get_contents("php://input"), true);
        $stmt = mysqli_prepare($conexion,
            "UPDATE mobiliario SET nombre=?, categoria=?, ambiente=?, material=?, precio=? WHERE id=?");
        mysqli_stmt_bind_param($stmt, "ssssdi",
            $datos['nombre'], $datos['categoria'], $datos['ambiente'], $datos['material'], $datos['precio'], $id);
        if (!mysqli_stmt_execute($stmt)) { http_response_code(500); echo json_encode(["error" => mysqli_stmt_error($stmt)]); break; }
        echo json_encode(["mensaje" => "Mueble actualizado"]);
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $stmt = mysqli_prepare($conexion, "DELETE FROM mobiliario WHERE id=?");
        mysqli_stmt_bind_param($stmt, "i", $id);
        if (!mysqli_stmt_execute($stmt)) { http_response_code(500); echo json_encode(["error" => mysqli_stmt_error($stmt)]); break; }
        echo json_encode(["mensaje" => "Mueble eliminado"]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}

mysqli_close($conexion);
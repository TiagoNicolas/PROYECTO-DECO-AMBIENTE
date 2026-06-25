<?php
// Reemplaza a app.use(cors()) y app.use(express.json()) de Express.
// Se incluye al inicio de cada endpoint.

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// El navegador manda una petición OPTIONS antes de POST/PUT/DELETE (preflight).
// Hay que responderla vacía y cortar la ejecución.
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

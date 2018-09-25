<?php

use DevPledge\CurlRequest;

require __DIR__ . '/../vendor/autoload.php';
$method = $_SERVER['REQUEST_METHOD'];
$path   = $_SERVER['PATH_INFO'];
session_start();
@header( 'Content-Type: application/json;charset=utf-8' );

$sessionOriginToken = 0;
if ( ( $method == 'POST' && $path == '/startSession' ) ) {
	$cache              = new \DevPledge\Cache();
	$sessionOriginToken = $_SESSION['origin_session_token'] = $cache->getOriginToken();
} else {
	if ( isset( $_SESSION['origin_session_token'] ) ) {
		$sessionOriginToken = $_SESSION['origin_session_token'];
	} else {
		echo json_encode( [ 'error' => 'no ui api session detected!', 'end_point' => 'POST /startSession' ] );
		die;
	}
}


$body    = file_get_contents( 'php://input' );
$headers = getallheaders();
try {
	@$curl = new CurlRequest( 'nginx:8082' . $path );
	@$curl->setMethod( $method );
	@$curl->setData( $body );
	@$curl->setHeaders( array_merge( $headers, [ 'Origin-Auth: ' . $sessionOriginToken ] ) );
	@$resp = $curl->getResponse();
	@$recHeaders = $curl->getReceivedHeaders();
	@header( 'Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD' );
	@header( 'Access-Control-Allow-Origin: dev.devpledge.com' );
	@http_response_code( $curl->getHttpCode() );
} catch ( \Exception | \TypeError $exception ) {

	if ( ! isset( $resp ) ) {
		@http_response_code( 500 );
		$resp = json_encode( [ 'error' => 'call failed!' ] );
	}
}
echo $resp;








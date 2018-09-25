<?php

use DevPledge\Integrations\Curl\CurlRequest;

require __DIR__ . '/../vendor/autoload.php';

require __DIR__ . '/Curl/CurlRequest.php';

$method  = $_SERVER['REQUEST_METHOD'];
$path    = $_SERVER['PATH_INFO'];
$body    = file_get_contents( 'php://input' );
$headers = getallheaders();
try {
	@$curl = new CurlRequest( 'nginx:8082' . $path );
	@$curl->setMethod( $method );
	@$curl->setData( $body );
	@$curl->setHeaders( array_merge( $headers, [ 'Origin-Auth: xyz' ] ) );
	@$resp = $curl->getResponse();
	@$recHeaders = $curl->getReceivedHeaders();
	@header( 'Content-Type: application/json;charset=utf-8' );
	@header( 'Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD' );
	@header( 'Access-Control-Allow-Origin: dev.devpledge.com' );
	@http_response_code( $curl->getHttpCode() );
} catch ( \Exception | \TypeError $exception ) {

	if ( ! isset( $resp ) ) {
		$resp = json_encode( [ 'error' => 'call failed!' ] );
	}
}
echo $resp;








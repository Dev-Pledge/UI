<?php

namespace DevPledge;


use Predis\Client;

class Cache {
	/**
	 * @var Client
	 */
	protected $client;

	public function __construct() {
		$this->client = new Client( 'cache:6379' );
	}

	/**
	 * @param $sessionOriginToken
	 *
	 * @return bool
	 */
	public function continueOriginToken( $sessionOriginToken ) {
		$json = $this->client->get( $sessionOriginToken );
		$data = \json_decode( $json );
		if ( $data === null ) {
			$this->createOriginToken( $sessionOriginToken );
		}
		if(isset($data->refresh)){
			if($data->refresh > time()){
				return true;
			}
		}
		$this->createOriginToken( $sessionOriginToken );
		return true;
	}

	public function createOriginToken( $sessionOriginToken ) {
		$data = [];
		$data[ 'refresh' ] = (time() + 60);
		$data                 = array_merge( $data, $_SERVER );
		$this->client->setex( $sessionOriginToken, 70, \json_encode( $data ) );
	}

}
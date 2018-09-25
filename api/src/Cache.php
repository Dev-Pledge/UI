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

	public function getOriginToken() {
		return $this->client->get( 'originToken' );
	}

}
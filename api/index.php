<?php
if ( getenv( 'ENVIRONMENT' ) == 'development' ) {
	phpinfo();
} else {
	echo 'no access '.getenv( 'ENVIRONMENT' );
}
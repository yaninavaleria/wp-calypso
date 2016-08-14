import superagent from 'superagent';

import {
	GEOLOCATION_FETCH,
	GEOLOCATION_FETCH_COMPLETED,
	GEOLOCATION_FETCH_FAILED
} from 'state/action-types';

export function fetchGeolocation( dispatch ) {
	return () => {
		dispatch( {
			type: GEOLOCATION_FETCH
		} );

		return new Promise( ( resolve, reject ) => {
			superagent.get( 'https://public-api.wordpress.com/geo.php', null, ( error, res ) => {
				if ( error ) {
					dispatch( {
						type: GEOLOCATION_FETCH_FAILED,
						error: error
					} );
					reject( error );
					return;
				}
				dispatch( {
					type: GEOLOCATION_FETCH_COMPLETED,
					location: res.body
				} );
			} );
		} );
	};
}

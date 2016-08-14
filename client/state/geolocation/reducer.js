import { combineReducers } from 'redux';
import camelCase from 'lodash/camelCase';
import mapKeys from 'lodash/mapKeys';

import {
	GEOLOCATION_FETCH_COMPLETED,
	GEOLOCATION_FETCH_FAILED
} from 'state/action-types';
import { geolocationSchema } from './schema';
import { createReducer } from 'state/utils';

const locationReducer = createReducer( {}, {
	[ GEOLOCATION_FETCH_COMPLETED ]: ( state, { location } ) => mapKeys( location, camelCase ),
	[ GEOLOCATION_FETCH_FAILED ]: () => {}
}, geolocationSchema );

export default combineReducers( {
	location: locationReducer
} );

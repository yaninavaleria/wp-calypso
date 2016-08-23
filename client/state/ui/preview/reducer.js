/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import {
	PREVIEW_URL_CLEAR,
	PREVIEW_URL_SET,
	PREVIEW_TOOL_SET,
} from 'state/action-types';

export function currentPreviewUrl( state = null, action ) {
	switch ( action.type ) {
		case PREVIEW_URL_SET:
			return action.url;
		case PREVIEW_URL_CLEAR:
			return null;
	}
	return state;
}

export function activeDesignTool( state = null, action ) {
	switch ( action.type ) {
		case PREVIEW_TOOL_SET:
			return action.id;
	}
	return state;
}

export default combineReducers( {
	currentPreviewUrl,
	activeDesignTool,
} );

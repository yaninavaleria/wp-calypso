/**
 * Internal dependencies
 */
import {
	PREVIEW_URL_CLEAR,
	PREVIEW_URL_SET,
	PREVIEW_TOOL_SET,
} from 'state/action-types';

export function setPreviewUrl( url ) {
	return {
		type: PREVIEW_URL_SET,
		url,
	};
}

export function clearPreviewUrl() {
	return {
		type: PREVIEW_URL_CLEAR,
	};
}

export function setActiveDesignTool( id ) {
	return {
		type: PREVIEW_TOOL_SET,
		id,
	};
}

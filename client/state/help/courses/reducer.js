/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import { createReducer } from 'state/utils';
import { helpCoursesSchema } from './schema';
import {
	HELP_COURSES_RECEIVE,
	HELP_COURSES_REQUEST,
	HELP_COURSES_REQUEST_FAILURE,
	HELP_COURSES_REQUEST_SUCCESS
} from 'state/action-types';

/**
 * Returns the updated requesting state after an action has been dispatched.
 * Requesting state tracks whether a network request is in progress for a site.
 *
 * @return {Object}        Updated state
 */
export const requesting = createReducer( {}, {
	[ HELP_COURSES_REQUEST ]: () => true,
	[ HELP_COURSES_REQUEST_FAILURE ]: () => false,
	[ HELP_COURSES_REQUEST_SUCCESS ]: () => false
} );

/**
 * Returns the updated courses state after an action has been dispatched. Items
 * state tracks an array of page templates available for a site. Receiving
 * templates for a site will replace the existing set.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action object
 */
export const items = createReducer( {}, {
	[ HELP_COURSES_RECEIVE ]: ( state, { courses } ) => courses
}, helpCoursesSchema );

export default combineReducers( {
	requesting,
	items
} );

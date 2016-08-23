/**
 * Internal dependencies
 */
import wpcom from 'lib/wp';
import {
	HELP_COURSES_RECEIVE,
	HELP_COURSES_REQUEST,
	HELP_COURSES_REQUEST_FAILURE,
	HELP_COURSES_REQUEST_SUCCESS
} from 'state/action-types';

/**
 * Returns an action object used in signalling that a set of help courses has been
 * receivede.
 *
 * @param  {Object[]} courses Array of course objects
 * @return {Object}           Action object
 */
export function receiveHelpCourses( courses ) {
	return {
		type: HELP_COURSES_RECEIVE,
		courses
	};
}

/**
 * Returns a function which, when invoked, triggers a network request to fetch
 * help courses.
 *
 * @return {Function}        Action thunk
 */
export function requestHelpCourses() {
	return ( dispatch ) => {
		dispatch( {
			type: HELP_COURSES_REQUEST
		} );

		return wpcom.undocumented().getHelpCourses().then( ( { courses } ) => {
			dispatch( receiveHelpCourses( courses ) );
			dispatch( {
				type: HELP_COURSES_REQUEST_SUCCESS
			} );
		} ).catch( ( error ) => {
			dispatch( {
				type: HELP_COURSES_REQUEST_FAILURE,
				error
			} );
		} );
	};
}

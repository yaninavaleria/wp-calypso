/**
 * Returns true if a request is in progress to retrieve the help courses
 * or false otherwise.
 *
 * @param  {Object}  state  Global state tree
 * @return {Boolean}        Whether a request is in progress
 */
export function isRequestingHelpCourses( state ) {
	return !! state.help.courses.requesting;
}

/**
 * Returns an array of page template objects for the specified site ID, or null
 * if the page templates are not known for the site.
 *
 * @param  {Object} state  Global state tree
 * @param  {Number} siteId Site ID
 * @return {?Array}        Page template objects, if known
 */
export function getHelpCourses( state ) {
	return state.help.courses.items || [];
}

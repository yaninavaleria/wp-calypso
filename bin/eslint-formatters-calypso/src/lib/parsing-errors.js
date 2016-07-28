/* eslint strict: "off" */

'use strict';

module.exports = function( report ) {
	// deep clone the report, so we can create a new one
	// to tweak and edit in place - as this function remains pure.
	let newReport = [];

	const isParsingError = ( message ) => {
		// ESLint team have reached the consensus of treating
		// parsing errors as any other error. See:
		//
		// - discussion https://github.com/eslint/eslint/issues/3555
		// - PR https://github.com/eslint/eslint/pull/3967
		//
		// Unlike any other error, thought, its ruleId would be null
		// and the message received by the parser would be prepended
		// by the string 'Parsing error:'. Also, they would contain
		// a new key "fatal" with value true.

		if ( ( message.ruleId === null ) ||
		message.message.startsWith( 'Parsing error:' ) ||
		message.fatal ) {
			return true;
		}
		return false;
	};

	report.forEach( file => {
		let areParsingErrors = false;
		file.messages.forEach( message => {
			if ( isParsingError( message ) ) {
				// A file contains only 1 message if there are parsing errors
				// so it would be safe to push the file to the report
				// at this point. Just in case, use a flag a push it outside
				// this bucle.
				areParsingErrors = true;
			}
		} );
		if ( areParsingErrors ) {
			newReport.push( file );
		}
	} );

	return newReport;
};

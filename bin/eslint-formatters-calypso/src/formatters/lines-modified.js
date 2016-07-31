/* eslint strict: "off" */

'use strict';

const differ = require( '../lib/differ' );
const eslines = require( '../lib/eslines' );
const gitDiffBranchVSMaster = require( '../lib/git-diff' );
const gitDiffIndex = require( '../lib/git-diff-index' );

module.exports = function( report ) {
	const whatToDiff = process.env.ESLINES_DIFF;
	let diff;
	if ( whatToDiff === 'index' ) {
		diff = gitDiffIndex();
	} else {
		diff = gitDiffBranchVSMaster();
	}

	const lines = differ( diff );
	return JSON.stringify( eslines( report, lines ) );
};

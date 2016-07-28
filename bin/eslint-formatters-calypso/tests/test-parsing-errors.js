const test = require( 'tape' );
const parsingErrors = require( '../src/lib/parsing-errors.js' );

// fixtures
const reportWithoutParsingErrors = require( './fixtures/eslint.json' );
const reportWithParsingError = require( './fixtures/eslint-parsing-errors.json' );
const reportWithParsingErrorMsg = require( './fixtures/eslint-parsing-errors-only-message.json' );
const reportWithParsingErrorRule = require( './fixtures/eslint-parsing-errors-only-ruleid.json' );
const reportWithParsingErrorFatal = require( './fixtures/eslint-parsing-errors-only-fatal.json' );

test( 'parsing-errors - returns empty report for reports without parsing errors', t => {
	const newReport = parsingErrors( reportWithoutParsingErrors );
	t.equals( newReport.length, 0 );

	t.end();
} );

test( 'parsing errors - returns report containing only files with parsing errors', t => {
	const newReport = parsingErrors( reportWithParsingError );
	t.equals( newReport.length, 1 );

	const newReportMsg = parsingErrors( reportWithParsingErrorMsg );
	t.equals( newReportMsg.length, 1 );

	const newReportRule = parsingErrors( reportWithParsingErrorRule );
	t.equals( newReportRule.length, 1 );

	const newReportFatal = parsingErrors( reportWithParsingErrorFatal );
	t.equals( newReportFatal.length, 1 );

	t.end();
} );

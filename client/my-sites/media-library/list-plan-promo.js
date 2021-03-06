/**
 * External dependencies
 */
import React from 'react';
import page from 'page';
import analytics from 'lib/analytics';
import { preventWidows } from 'lib/formatting';

/**
 * Internal dependencies
 */
const EmptyContent = require( 'components/empty-content' ),
	Button = require( 'components/button' );

module.exports = React.createClass( {
	displayName: 'MediaLibraryListPlanPromo',

	propTypes: {
		site: React.PropTypes.object,
		filter: React.PropTypes.string
	},

	getTitle: function() {
		switch ( this.props.filter ) {
			case 'videos':
				return this.translate( 'Upload Videos', { textOnly: true, context: 'Media upload plan needed' } );
				break;
			case 'audio':
				return this.translate( 'Upload Audio', { textOnly: true, context: 'Media upload plan needed' } );
				break;
			default:
				return this.translate( 'Upload Media', { textOnly: true, context: 'Media upload plan needed' } );
		}
	},

	getSummary: function() {
		switch ( this.props.filter ) {
			case 'videos':
				return preventWidows(
					this.translate(
						'To upload video files to your site, upgrade your plan.',
						{ textOnly: true, context: 'Media upgrade promo' }
				), 2 );
				break;
			case 'audio':
				return preventWidows(
					this.translate(
						'To upload audio files to your site, upgrade your plan.',
						{ textOnly: true, context: 'Media upgrade promo' }
				), 2 );
				break;
			default:
				return preventWidows(
					this.translate(
						'To upload audio and video files to your site, upgrade your plan.',
						{ textOnly: true, context: 'Media upgrade promo' }
				), 2 );
		}
	},

	viewPlansPage: function() {
		const { slug = '' } = this.props.site;

		analytics.tracks.recordEvent( 'calypso_media_plans_button_click' );

		page( `/plans/${ slug }` );
	},

	render: function() {
		const action = (
			<Button className="button is-primary" onClick={ this.viewPlansPage }>{ this.translate( 'See Plans' ) }</Button>
		);

		return (
			<EmptyContent
				title={ this.getTitle() }
				line={ this.getSummary() }
				action={ action }
				illustration={ '' } />
		);
	}
} );

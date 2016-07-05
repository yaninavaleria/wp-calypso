/**
 * External dependencies
 */
import React from 'react';
import PureRenderMixin from 'react-pure-render/mixin';

/**
 * Internal dependencies
 */
import FollowButtonContainer from 'components/follow-button';
import FollowButton from 'components/follow-button/button';
const stats = require( 'reader/stats' );

const ReaderFollowButton = React.createClass( {

	mixins: [ PureRenderMixin ],

	recordFollowToggle( isFollowing ) {
		stats[ isFollowing ? 'recordFollow' : 'recordUnfollow' ]( this.props.siteUrl );

		if ( this.props.onFollowToggle ) {
			this.props.onFollowToggle( isFollowing );
		}
	},

	render() {
		if ( this.props.isButtonOnly ) {
			return (
				<FollowButton { ...this.props } onFollowToggle={ this.recordFollowToggle } />
			);
		}

		return (
			<FollowButtonContainer { ...this.props } onFollowToggle={ this.recordFollowToggle } />
		);
	}

} );

export default ReaderFollowButton;

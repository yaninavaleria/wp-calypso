/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';
import page from 'page';
import Masonry from 'react-masonry-component';
import times from 'lodash/times';

/**
 * Internal dependencies
 */
import Main from 'components/main';
import { getRecommendationIds, getRecommendationFollowCount } from 'state/reader/start/selectors';
import QueryReaderStartRecommendations from 'components/data/query-reader-start-recommendations';
import StartCard from './card';
import CardPlaceholder from './card-placeholder';

const Start = React.createClass( {

	exitColdStart() {
		// Redirect to the following stream
		page.redirect( '/' );
	},

	renderLoadingPlaceholders() {
		const count = 4;
		return times( count, function( i ) {
			return ( <CardPlaceholder key={ 'placeholder-' + i } /> );
		} );
	},

	render() {
		const followCount = this.props.recommendationFollowCount;
		const canExit = ( followCount > 0 );
		const hasRecommendations = this.props.recommendationIds.length > 0;

		return (
			<Main className="reader-start">
				{ /* Have not followed a site yet */ }
				{ ! canExit && hasRecommendations &&
					<div className="reader-start__bar is-follow">
						<span className="reader-start__bar-text">{ this.translate( 'Follow some sites to begin.' ) }</span>
					</div>
				}

				{ /* Following at least one or more sites */ }
				{ canExit && hasRecommendations &&
					<div className="reader-start__bar is-following">
						<span className="reader-start__bar-text">
							{
								this.translate(
									'You\'re following %(followCount)d new site.',
									'You\'re following %(followCount)d new sites.',
									{
										count: followCount,
										args: {
											followCount: followCount
										}
									}
								)
							}
						</span>
						<a onClick={ this.exitColdStart } className="reader-start__bar-action">{ this.translate( 'Done.' ) }</a>
					</div>
				}

				<QueryReaderStartRecommendations />
				<header className="reader-start__intro">
					<h1 className="reader-start__title">{ this.translate( 'This is Reader' ) }</h1>
					<p className="reader-start__description">{ this.translate( 'Reader is a customizable magazine of stories from WordPress.com and across the web. Follow a few sites and their latest posts will appear here. Below are some suggestions. Give it a try!' ) }</p>
				</header>

				{ ! hasRecommendations && this.renderLoadingPlaceholders() }

				{ hasRecommendations && <Masonry className="reader-start__cards" updateOnEachImageLoad={ true } options={ { gutter: 14 } }>
					{ this.props.recommendationIds ? map( this.props.recommendationIds, ( recId ) => {
						return (
							<StartCard
								key={ 'start-card-rec' + recId }
								recommendationId={ recId } />
						);
					} ) : null }
				</Masonry> }

				{ hasRecommendations &&
				<div className="reader-start__manage">{ this.translate( 'Didn\'t find a site you\'re looking for?' ) }
					&nbsp;<a href="/following/edit">Follow by URL</a>.
				</div> }
			</Main>
		);
	}
} );

export default connect(
	( state ) => {
		return {
			recommendationIds: getRecommendationIds( state ),
			recommendationFollowCount: getRecommendationFollowCount( state )
		};
	}
)( Start );

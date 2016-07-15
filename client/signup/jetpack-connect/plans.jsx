/**
 * External dependencies
 */
import { connect } from 'react-redux';
import page from 'page';
import React from 'react';
import { bindActionCreators } from 'redux';

/**
 * Internal dependencies
 */
import { getPlansBySite } from 'state/sites/plans/selectors';
import { getFlowType } from 'state/jetpack-connect/selectors';
import Main from 'components/main';
import ConnectHeader from './connect-header';
import observe from 'lib/mixins/data-observe';
import PlansFeaturesMain from 'my-sites/plans-features-main';
import PlanList from 'components/plans/plan-list' ;
import plansFactory from 'lib/plans-list';
import { shouldFetchSitePlans } from 'lib/plans';
import { recordTracksEvent } from 'state/analytics/actions';
import { getCurrentUser } from 'state/current-user/selectors';
import * as upgradesActions from 'lib/upgrades/actions';
import { userCan } from 'lib/site/utils';
import { isCalypsoStartedConnection } from 'state/jetpack-connect/selectors';
import { goBackToWpAdmin } from 'state/jetpack-connect/actions';
import QueryPlans from 'components/data/query-plans';
import QuerySitePlans from 'components/data/query-site-plans';
import { requestPlans } from 'state/plans/actions';
import { isRequestingPlans, getPlanBySlug } from 'state/plans/selectors';
import { selectPlanInAdvance, goBackToWpAdmin } from 'state/jetpack-connect/actions';
import { getPlans } from 'state/plans/selectors';

const plans = plansFactory();

const CALYPSO_REDIRECTION_PAGE = '/posts/';

const Plans = React.createClass( {
	propTypes: {
		cart: React.PropTypes.object.isRequired,
		context: React.PropTypes.object.isRequired,
		destinationType: React.PropTypes.string,
		sites: React.PropTypes.object.isRequired,
		fetchSitePlans: React.PropTypes.func.isRequired,
		sitePlans: React.PropTypes.object.isRequired,
		showJetpackFreePlan: React.PropTypes.bool
	},

	componentDidMount() {
		this.props.recordTracksEvent( 'calypso_jpc_plans_view', {
			user: this.props.userId
		} );

		if ( this.props.flowType === 'pro' || this.props.flowType === 'premium' ) {
			return this.autoselectPlan();
		}
	},

	componentWillReceiveProps( props ) {
		const selectedSite = props.sites.getSelectedSite();
		if ( this.hasPlan( selectedSite ) ) {
			page.redirect( CALYPSO_REDIRECTION_PAGE + selectedSite.slug );
		}
		if ( ! props.canPurchasePlans ) {
			page.redirect( CALYPSO_REDIRECTION_PAGE + selectedSite.slug );
		}

		if ( ! this.props.isRequestingPlans && ( this.props.flowType === 'pro' || this.props.flowType === 'premium' ) ) {
			return this.autoselectPlan();
		}
	},

	hasPlan( site ) {
		return site &&
			site.plan &&
			( site.plan.product_slug === 'jetpack_business' || site.plan.product_slug === 'jetpack_premium' );
	},

	autoselectPlan() {
		if ( this.props.flowType === 'pro' ) {
			this.props.requestPlans();
			const plan = this.props.getPlanBySlug( 'jetpack_business' );
			if ( plan ) {
				this.selectPlan( plan );
				return;
			}
		}
		if ( this.props.flowType === 'premium' ) {
			this.props.requestPlans();
			const plan = this.props.getPlanBySlug( 'jetpack_premium' );
			if ( plan ) {
				this.selectPlan( plan );
				return;
			}
		}
	},

	componentWillReceiveProps( props ) {
		if ( ! props.sites ) {
			return;
		}

		if ( this.hasPlan( this.props.selectedSite ) ) {
			page.redirect( CALYPSO_REDIRECTION_PAGE + this.props.selectedSite.slug );
		}
		if ( ! props.canPurchasePlans ) {
			page.redirect( CALYPSO_REDIRECTION_PAGE + this.props.selectedSite.slug );
		}
	},

	updateSitePlans( sitePlans ) {
		this.props.fetchSitePlans( sitePlans, this.props.selectedSite );
	},

	selectFreeJetpackPlan() {
		this.props.recordTracksEvent( 'calypso_jpc_plans_submit_free', {
			user: this.props.userId
		} );
		if ( isCalypsoStartedConnection( this.props.jetpackConnectSessions, this.props.selectedSite.slug ) ) {
			page.redirect( CALYPSO_REDIRECTION_PAGE + this.props.selectedSite.slug );
		} else {
			const { queryObject } = this.props.jetpackConnectAuthorize;
			this.props.goBackToWpAdmin( queryObject.redirect_after_auth );
		}
	},

	selectPlan( cartItem ) {
		const selectedSite = this.props.sites.getSelectedSite();
		if ( cartItem.product_slug === 'jetpack_free' ) {
			return this.selectFreeJetpackPlan();
		}
		const checkoutPath = `/checkout/${ this.props.selectedSite.slug }`;
		if ( cartItem.product_slug === 'jetpack_premium' ) {
			this.props.recordTracksEvent( 'calypso_jpc_plans_submit_99', {
				user: this.props.userId
			} );
		}
		if ( cartItem.product_slug === 'jetpack_business' ) {
			this.props.recordTracksEvent( 'calypso_jpc_plans_submit_299', {
				user: this.props.userId
			} );
		}
		upgradesActions.addItem( cartItem );
		page( checkoutPath );
	},

	storeSelectedPlan( cartItem ) {
		this.props.selectPlanInAdvance( ( cartItem ? cartItem.product_slug : 'free' ), this.props.siteSlug );
	},

	render() {
		if ( this.props.flowType === 'pro' || this.props.flowType === 'premium' ) {
			return null;
		}

		if ( ! this.props.showFirst &&
			( ! this.props.canPurchasePlans || this.hasPlan( this.props.selectedSite ) )
		) {
			return null;
		}

		const jetpackPlans = plans.get().filter( ( plan ) => {
			return plan.product_type === 'jetpack';
		} );

		const defaultJetpackSite = { jetpack: true, plan: {}, isUpgradeable: () => true };

		return (
			<div>
				<Main wideLayout>
					<QueryPlans />
					<QuerySitePlans siteId={ selectedSite.ID } />
					<div className="jetpack-connect__plans">
						<ConnectHeader
							showLogo={ false }
							headerText={ this.translate( 'Your site is now connected!' ) }
							subHeaderText={ this.translate( 'Now pick a plan that\'s right for you' ) }
							step={ 1 }
							steps={ 3 } />

// <<<<<<< cbe5a9d30e830832cbd5314624761cf714163fbd
						<div id="plans" className="plans has-sidebar">
							<PlansFeaturesMain
								site={ selectedSite }
								isInSignup={ true }
								onUpgradeClick={ this.selectPlan }
								intervalType="yearly" />
/*=======
						<div id="plans" className="jetpack-connect__plans-list plans has-sidebar">
							<PlanList
								isInSignup={ true }
								site={ this.props.selectedSite ? this.props.selectedSite : defaultJetpackSite }
								plans={ jetpackPlans }
								sitePlans={ this.props.sitePlans }
								cart={ this.props.cart }
								showJetpackFreePlan={ true }
								isSubmitting={ false }
								onSelectPlan={ this.props.showFirst ? this.storeSelectedPlan : this.selectPlan }
								onSelectFreeJetpackPlan={ this.props.showFirst ? this.storeSelectedPlan : this.selectFreeJetpackPlan }/>
>>>>>>> JPC: Jetpack plans selection first */
						</div>
					</div>
				</Main>
			</div>
		);
	}
} );

export default connect(
	( state, props ) => {
		const user = getCurrentUser( state );
/* <<<<<<< cbe5a9d30e830832cbd5314624761cf714163fbd
		const selectedSite = props.sites.getSelectedSite();

		const searchPlanBySlug = ( planSlug ) => {
			return getPlanBySlug( state, planSlug );
		};

=======/*/
		const selectedSite = props.sites ? props.sites.getSelectedSite() : null;
//>>>>>>> JPC: Jetpack plans selection first
		return {
			plans: getPlans( state ),
			sitePlans: getPlansBySite( state, selectedSite ),
			jetpackConnectSessions: state.jetpackConnect.jetpackConnectSessions,
			jetpackConnectAuthorize: state.jetpackConnect.jetpackConnectAuthorize,
			userId: user ? user.ID : null,
			canPurchasePlans: userCan( 'manage_options', selectedSite ),
			flowType: getFlowType( state.jetpackConnect.jetpackConnectSessions, selectedSite ),
/* <<<<<<< cbe5a9d30e830832cbd5314624761cf714163fbd
			isRequestingPlans: isRequestingPlans( state ),
			getPlanBySlug: searchPlanBySlug
		};
	},
	( dispatch ) => {
		return Object.assign( {},
			bindActionCreators( { goBackToWpAdmin, requestPlans }, dispatch ),
=======*/
			selectedSite: selectedSite
		};
	},
	( dispatch ) => {
		return Object.assign( {},
			bindActionCreators( { goBackToWpAdmin, selectPlanInAdvance }, dispatch ),
//>>>>>>> JPC: Jetpack plans selection first
			{
				recordTracksEvent( eventName, props ) {
					dispatch( recordTracksEvent( eventName, props ) );
				}
			}
		);
	}
)( Plans );

/**
 * External dependencies
 */
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { isRequestingHelpCourses } from 'state/page-templates/selectors';
import { requestHelpCourses } from 'state/help/courses/actions';

class QueryHelpCourses extends Component {
	static propTypes = {
		isRequesting: PropTypes.bool,
		requestHelpCourses: PropTypes.func
	}

	componentWillMount() {
		this.request( this.props );
	}

	request( props ) {
		if ( ! props.isRequesting ) {
			props.requestHelpCourses();
		}
	}

	render() {
		return null;
	}
}

export default connect(
	( state ) => {
		return {
			isRequesting: isRequestingHelpCourses( state )
		};
	},
	{ requestHelpCourses }
)( QueryHelpCourses );

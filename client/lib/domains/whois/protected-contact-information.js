/**
 * Internal dependencies
 */
import { isOpenHrsDomain, isOpenSrsDomain } from 'lib/domains';

function getOpenHrsProtectedContactInformation( domain ) {
	return {
		firstName: 'Private',
		lastName: 'Whois',
		organization: 'Knock Knock Whois Not There LLC',
		email: `${ domain }@privatewho.is`,
		phone: '+1.8772738550',
		address1: '60, 29th Street',
		address2: '#343',
		city: 'San Francisco',
		state: 'CA',
		postalCode: '94110-4929',
		countryCode: 'US'
	};
}

function getOpenSrsProtectedContactInformation( domain ) {
	return {
		firstName: '',
		lastName: 'Contact Privacy Inc. Customer 012345',
		organization: 'Contact Privacy Inc. Customer 012345',
		email: `${ domain }@contactprivacy.com`,
		phone: '+1.4165385457',
		address1: '96',
		address2: 'Mowat Ave',
		city: 'Toronto',
		state: 'ON',
		postalCode: 'M6K 3M1',
		countryCode: 'CA'
	};
}

function getWwdProtectedContactInformation( domain ) {
	return {
		firstName: '',
		lastName: '',
		organization: 'Domains By Proxy, LLC',
		email: `${ domain }@domainsbyproxy.com`,
		phone: '+1.4806242599',
		address1: '14747 N Northsight Blvd',
		address2: 'Suite 111, PMB 309',
		city: 'Scottsdale',
		state: 'AZ',
		postalCode: '85260',
		countryCode: 'US'
	};
}

function getProtectedContactInformation( domain ) {
	if ( isOpenHrsDomain( domain ) ) {
		return getOpenHrsProtectedContactInformation( domain );
	} else if ( isOpenSrsDomain( domain ) ) {
		return getOpenSrsProtectedContactInformation( domain );
	}
	return getWwdProtectedContactInformation( domain );
}

export default getProtectedContactInformation;

import _omit from 'lodash/omit';
import LoanSearchCriteria, {
	criteriaAreEqual,
	getCacheableCriteria,
	getInputCriteria,
} from './LoanSearchCriteria';

// Return an AutolendProfile object with default values
export default function AutolendProfile() {
	return {
		__typename: 'AutolendProfile',
		id: null,
		isEnabled: false,
		donationPercentage: 15,
		enableAfter: 0,
		loanSearchCriteria: LoanSearchCriteria(),
	};
}

// Return a profile suitable to write to the cache
export function getCacheableProfile(profile) {
	const result = {
		...profile,
		__typename: 'AutolendProfile',
	};
	if (profile.loanSearchCriteria) {
		result.loanSearchCriteria = getCacheableCriteria(profile.loanSearchCriteria);
	}
	return result;
}

// Return a cleaned profile suitable for a query variable
export function getInputProfile({ loanSearchCriteria, ...profile }) {
	const cleanProfile = _omit(profile, [
		'id',
		'__typename',
	]);
	return {
		...cleanProfile,
		loanSearchCriteria: getInputCriteria(loanSearchCriteria),
	};
}

// Return true if the two given autolend profiles have the same settings
export function profilesAreEqual(a, b) {
	if (!a && !b) return true; // if both are undefined, return true
	if (!a || !b) return false; // if only one is undefined, return false
	if (a.isEnabled !== b.isEnabled) return false;
	if (a.enableAfter !== b.enableAfter) return false;
	if (a.donationPercentage !== b.donationPercentage) return false;
	if (!criteriaAreEqual(a.loanSearchCriteria, b.loanSearchCriteria)) return false;
	return true;
}

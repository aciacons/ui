import _get from 'lodash/get';
import cookieStore from '@/util/cookieStore';
import experimentQuery from '@/graphql/query/lendByCategory/experimentAssignment.graphql';
import updateExperimentVersion from '@/graphql/mutation/updateExperimentVersion.graphql';

export default {
	data() {
		return {
			lendFilterExpActive: false,
			lendFilterExpVersion: '',
			shouldUpdateLendFilterExpCookie: false,
		};
	},
	methods: {
		getLendFilterExpVersion() {
			// Lend Filter Exp
			// Read temp cookie (set before redirect from /lend) + Assignment (should only ever = 'b')
			const lendListViewExpLegacy = cookieStore.get('kvlendfilter') || '';
			// We have a legacy experiment already set
			if (lendListViewExpLegacy !== '') {
				// use legacy version
				this.lendFilterExpVersion = lendListViewExpLegacy;
				// Once Mounted we need to update the ui cookie to ensure future continuity between stacks
				this.shouldUpdateLendFilterExpCookie = true;
			} else {
				// we have no legacy exp setup, use ui assignment
				const lendFilterEXP = this.apollo.readQuery({
					query: experimentQuery,
					variables: { id: 'lend_filter_v2' },
				});
				this.lendFilterExpVersion = _get(lendFilterEXP, 'experiment.version');
			}
			// Set Active Status
			this.lendFilterExpActive = this.lendFilterExpVersion === 'b';
		},
		updateLendFilterExp() {
			if (this.lendFilterExpActive || this.lendFilterExpVersion === 'c') {
				this.$kvTrackEvent(
					'Lending',
					'EXP-CASH-545-Apr2019',
					this.lendFilterExpVersion
				);
			}
			// if we've recieved + overridden the ui assignment with a legacy assignment
			if (this.shouldUpdateLendFilterExpCookie || this.lendFilterExpVersion === 'c') {
				// re-assign uiab cookie using our legacy assignment
				this.apollo.mutate({
					mutation: updateExperimentVersion,
					variables: {
						id: 'lend_filter_v2',
						version: this.lendFilterExpVersion
					}
				}).then(() => {
					// remove legacy cookie
					cookieStore.remove('kvlendfilter');
				});
			}
		},
		exitLendFilterExp(click) {
			this.lendFilterExpVersion = 'c';
			this.updateLendFilterExp();
			this.$kvTrackEvent('Lending', click, 'Exit-CASH-545-2019');
			window.location.href = '/lend?kexpn=lend_filter_v2.lend_filter_v2_versions&kexpv=c';
		}
	}
};

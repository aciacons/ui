import _map from 'lodash/map';
import _get from 'lodash/get';
import minimatch from 'minimatch';
import logFormatter from '@/util/logFormatter';
// import { handleApolloErrors } from '@/util/apolloPreFetch';
import experimentIdsQuery from '@/graphql/query/experimentIds.graphql';
import experimentSettingQuery from '@/graphql/query/experimentSetting.graphql';
import experimentAssignmentQuery from '@/graphql/query/experimentAssignment.graphql';
// import experimentCookieCleaner from '@/graphql/mutation/experimentCookieCleaner.graphql';
import updateExperimentVersion from '@/graphql/mutation/updateExperimentVersion.graphql';

// Pre-fetch pre-determined list of experiment settings
// TODO: Centralize this in Settings Manager or elsewhere, then Fetch it First
const activeExperiments = [
	{
		id: 'lend_filter_v2',
		routes: [
			'**'
		]
	},
	{
		id: 'expandable_loan_cards',
		routes: [
			'**'
		]
	},
	{
		id: 'intercom_messenger',
		routes: [
			'**'
		]
	},
	{
		id: 'add_to_basket_redirect',
		routes: [
			'**'
		]
	},
	{
		id: 'checkout_login_cta',
		routes: [
			'**'
		]
	},
	{
		id: 'homepage_force_dismiss_overlay',
		routes: [
			'/' // homepage only
		]
	},
	{
		id: 'home_only_test',
		routes: [
			'/' // homepage only
		]
	},
	{
		id: 'exp_lend_by_category_test',
		routes: [
			'/lend-by-category/*' // lend-by-category and children
		]
	},
];

// TODO: Enhance Error handling
// export function settingErrorHandler(errors, ...args) {
// 	console.log(errors);
// 	console.log(args);
// 	return new Promise(resolve => {
// 		resolve();
// 	});
// }

export function assignExperiments(settingId, client) {
	// Fetch the query from the component's apollo options
	return new Promise((resolve, reject) => {
		client.query({
			query: experimentAssignmentQuery,
			variables: {
				id: settingId || '',
			}
		}).then(result => {
			if (result.errors) {
				resolve(result.errors);
				// TODO: Handle Apollo errors with custom code
				// handleApolloErrors(settingErrorHandler, result.errors).then(resolve).catch(reject);
			} else {
				resolve(result);
			}
		}).catch(reject);
	});
}

export function fetchExperimentSettings(settingId, client) {
	// Fetch the query from the component's apollo options
	console.log('fetchExperimentSettings');
	return new Promise((resolve, reject) => {
		client.query({
			query: experimentSettingQuery,
			variables: {
				key: settingId || '',
			},
			fetchPolicy: 'network-only', // This is used to force re-fetch of queries after new auth
		}).then(result => {
			if (result.errors) {
				logFormatter(result.errors, 'error');
				resolve(result.errors);
			}
			// TODO: Make Active Exp list a map including a flag for pre-fetch assignment
			// > this should take the form of a route string, set to global or empty for multi-page experiments
			return assignExperiments(settingId, client);
		}).then(result => {
			if (result.errors) {
				logFormatter(result.errors, 'error');
				resolve(result.errors);
				// TODO: Handle Apollo errors with custom code
				// handleApolloErrors(settingErrorHandler, result.errors).then(resolve).catch(reject);
			} else {
				resolve(result);
			}
		}).catch(reject);
	});
}

export function fetchActiveExperiments(apolloClient) {
	console.log('fetchActiveExperiments');
	return new Promise((resolve, reject) => {
		apolloClient.query({
			query: experimentIdsQuery,
			fetchPolicy: 'network-only',
		}).then(results => {
			if (results.errors) {
				logFormatter(results.errors, 'error');
				resolve(results.errors);
			}
			resolve(results);
		}).catch(reject);
	});
}

/*
	Handle Experiment settings globally
	1. Determine Active Experiments
	2. COMING SOON: Remove inactive experiments from cookie
	3. Force assign any experiment set using the 'setuiab' query param
	4. Fetch All active Experiment Settings
		a. All "active" experiment settings are now in the cache
		b. All "active" experiments with no route or the current route are give assignments
*/
export function fetchAllExpSettings(apolloClient, route) {
	console.log('fetchAllExpSettings');

	return fetchActiveExperiments(apolloClient).then(results => {
		// Check for active experiments listing
		let experiments = [];
		const activeExperimentsSettings = _get(results, 'data.general.activeExperiments');
		if (typeof activeExperimentsSettings !== 'undefined' && activeExperimentsSettings !== null) {
			try {
				experiments = JSON.parse(activeExperimentsSettings.value).split(',');
			} catch (e) {
				// leave as defaults
			}
		}
		return experiments;
	})

	// COMING SOON!!!
	// Remove any cookies that don't exist in the active experiments listing
	// }).then(() => {
	// 	return apolloClient.mutate({
	// 		mutation: experimentCookieCleaner
	// 	});

		// Assign specific experiment version if present in query params
		// > query param must be 'setuiab'
		// > value should be and ACTIVE experiment id and the version you want to assign separated by a period '.'
		.then(() => {
			const routeQuery = _get(route, 'query.setuiab');
			if (routeQuery !== undefined) {
				// Convert both a single string and an array of strings to an array of strings.
				const arrayOfSetuiabValues = [].concat(routeQuery);

				// Iterate through all setuiab values in query and updateExperimentVersion
				// TODO: Check for experiment setting + enable = true from server before running mutation
				return Promise.all(arrayOfSetuiabValues.map(uiabvalue => {
					const forcedExp = uiabvalue.split('.');
					return apolloClient.mutate({
						mutation: updateExperimentVersion,
						variables: {
							id: encodeURIComponent(forcedExp[0]),
							version: encodeURIComponent(forcedExp[1])
						}
					});
				}));
			}
			return true;
		})
		// prefetch all active experiment settings and assignments if the current route matches their glob
		.then(() => {
			const currentRouteExperiments = activeExperiments.filter(experiment => {
				let expInRoute = false;
				experiment.routes.forEach(expRoute => {
					if (minimatch(route.path, expRoute)) {
						expInRoute = true;
					}
				});
				return expInRoute;
			});
			console.log('Experiments for the current route:');
			console.log(currentRouteExperiments);
			return Promise.all(_map(currentRouteExperiments, exp => fetchExperimentSettings(exp.id, apolloClient)));
		});
}

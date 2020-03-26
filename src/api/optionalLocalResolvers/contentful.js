import { GraphQLJSONObject } from 'graphql-type-json';
import { createApolloFetch } from 'apollo-fetch';

const fetch = createApolloFetch({
	uri: 'https://marketplace-api.dk1.kiva.org/graphql',
});

/**
 * Contentful resolvers
 */
export default () => {
	return {
		resolvers: {
			JSONObject: GraphQLJSONObject,
			Query: {
				contentful(_, payload) {
					return {
						...payload,
						__typename: 'Contentful'
					};
				}
			},
			Contentful: {
				/**
				 * Get data from contentful CMS
				 *
				 * contentKey and contentType correspond to the values in contentful.
				 * contentType is required, if contentKey is omitted, all content
				 * is returned for that type. If contentKey is present, only the content
				 * that matches that key is returned. contentKey is a custom contentful
				 * field on objects of that type which corresponds to ['fields.key']
				 *
				 * Returns: object in the form:
				 * {
				 *	"data": {
				 *		"contentful": {
				 *			"entries": {
				 *				"sys": { <Contentful Metadata> },
				 *				"total": 1,
				 *				"skip": 0,
				 *				"limit": 100,
				 *				"items": [
				 *					{
				 *						"sys": { <Contentful Metadata> },
				 *						"fields": { <Contentful Fields for that contentType> }
				 *					}
				 *				],
				 *				"includes": {
				 *				"Entry": [
				 *					{
				 *						"sys": { <Contentful Metadata> },
				 *						"fields": { <Contentful Fields for that contentType> }
				 *					}
				 *				]
				 *				}
				 *			}
				 *		}
				 *	}
				 *
				 * @param {string} contentKey, contentType
				 * @returns {object}
				 */

				entries(_, { contentKey, contentType }) {
					fetch({
						query: `query ContentfulFromGQLFederation($contentType: String!, $contentKey: String!) {
								contentful {
									entries(contentType: $contentType, contentKey: $contentKey)
								}
							}`,
						variables: { contentType, contentKey },
					}).then(res => {
						return res;
					});
				},
			},
		}
	};
};

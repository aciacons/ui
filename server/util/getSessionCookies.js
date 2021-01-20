const setCookieParser = require('set-cookie-parser');
const fetch = require('./fetch');

const getCookieString = cookies => {
	return Object.keys(cookies)
		.map(key => `${key}=${cookies[key]}`)
		.join(';');
};

const decodeCookieValue = value => {
	try {
		return decodeURIComponent(value);
	} catch (e) {
		return value;
	}
};

module.exports = function getSessionCookies(url = '', requestCookies = {}) {
	return new Promise((resolve, reject) => {
		console.log('getSeshCooookies', url, 'kvbskt: ', requestCookies.kvbskt || 'no kvbskt set');
		if (url.length && (!requestCookies.kv || !requestCookies.kvis || !requestCookies.kvbskt)) {
			console.log('getSeshCooookies if: ', requestCookies.kv, requestCookies.kvis, requestCookies.kvbskt);
			fetch(url, {
				headers: {
					Cookie: getCookieString(requestCookies),
				},
			}).then(res => {
				const combinedCookieHeader = res.headers.get('set-cookie');
				const splitCookieHeaders = setCookieParser.splitCookiesString(combinedCookieHeader);
				const parsed = setCookieParser.parse(splitCookieHeaders, { decodeValues: false });
				const cookies = parsed.reduce((cookieObject, cookie) => {
					console.log(cookie);
					if (cookie.value !== 'deleted') {
						return Object.assign(cookieObject, { [cookie.name]: decodeCookieValue(cookie.value) });
					}
					return cookieObject;
				}, {});
				resolve({ setCookies: splitCookieHeaders, cookies });
			}).catch(err => reject(err));
		} else {
			resolve({
				setCookies: [],
				cookies: {},
			});
		}
	});
};

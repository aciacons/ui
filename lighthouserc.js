module.exports = {
	ci: {
		collect: {
			startServerCommand: 'npm start -- --config=local',
			startServerReadyPattern: 'server started at',
			url: [
				'http://localhost:8888/',
				// 'http://localhost:8888/lend/filter',
				// 'http://localhost:8888/lend-by-category',
				// 'http://localhost:8888/lend-by-category/women'
			]
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
};

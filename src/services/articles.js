const TEST_DATA_URL = 'https://storage.googleapis.com/aller-structure-task/test_data.json';

export function loadArticlesByUrl() {
	return fetch(TEST_DATA_URL);
}
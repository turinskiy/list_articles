const TEST_DATA_URL = 'https://storage.googleapis.com/aller-structure-task/test_data.json';

export function loadArticlesByUrl() {
	return fetch(TEST_DATA_URL);
}

export function getValueFromUrl(url, searchKey) {
	let splitRes = url.split(searchKey);

	if (splitRes.length > 1) {
		splitRes = splitRes[1].split('&');

		return splitRes[0];
	}

	return '';
}

const STORAGE_TYPE = 'localStorage'; // 'sessionStorage'
const DATA_KEY = 'articles';

export function checkStorageAvailability() {
	let isStorageAvailable = storageAvailable(STORAGE_TYPE);
	!isStorageAvailable && alert(`Be aware: The ${STORAGE_TYPE} is unavailable! Your changes won't be saved.`);

	return isStorageAvailable;
}

export function saveAllArticles(data) {
	return new Promise((resolve, reject) => {
		saveDataToStorage(data);
		resolve(true);
	});
}

export function loadAllArticles() {
	return getDataFromStorage();
}

function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch (e) {
		return false;
	}
}

function saveDataToStorage(data) {
	window[STORAGE_TYPE].setItem(DATA_KEY, JSON.stringify(data));	
}

function getDataFromStorage() {
	let data = JSON.parse(window[STORAGE_TYPE].getItem(DATA_KEY));
	// data && console.log('get all data from the Store', data.length);
	return data;
}
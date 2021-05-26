const STORAGE_TYPE = 'localStorage'; // 'sessionStorage'

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

export function saveAllArticles(data) {
	if (storageAvailable(STORAGE_TYPE)) {
		saveDataToStorage(data);
	}
	else {
		alert(`Be aware: The ${STORAGE_TYPE} is unavailable! Your changes won't be saved.`)
	}
}

function saveDataToStorage(data) {
	window[STORAGE_TYPE].setItem('articles', data);	
}

function getDataFromStorage(key) {
	window[STORAGE_TYPE].getItem(key);
}
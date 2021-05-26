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
		let promise = new Promise((resolve, reject) => {
			saveDataToStorage(data);
			resolve(true);
		});
		
		return promise;
	}
	else {
		alert(`Be aware: The ${STORAGE_TYPE} is unavailable! Your changes won't be saved.`)
	}
}

export function loadAllArticles() {
	return getDataFromStorage();
}

function saveDataToStorage(data) {
	window[STORAGE_TYPE].setItem('articles', JSON.stringify(data));	
}

function getDataFromStorage() {
	return JSON.parse(window[STORAGE_TYPE].getItem('articles'));
}
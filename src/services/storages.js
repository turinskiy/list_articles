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
	if (storageAvailable('localStorage')) {
		// Save all the data
	}
	else {
		alert('Be aware: The Localstorage is unable and you CAN NOT edit or delete anything!')
	}
}

export function saveToSessionStorage(item) {
	sessionStoragesetItem(item.key, item.value);
}
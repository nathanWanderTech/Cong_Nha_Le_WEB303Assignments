/*
    Assignment #4
    Cong Nha Le - 0761950
*/

// DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
// function to calculate the distance in metres between two lat/long pairs on Earth
// Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
// Aren't those cool variable names? Yah gotta love JavaScript
function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
	var toRadians = function (num) {
		return (num * Math.PI) / 180;
	};
	var R = 6371000; // radius of Earth in metres
	var φ1 = toRadians(lat1);
	var φ2 = toRadians(lat2);
	var Δφ = toRadians(lat2 - lat1);
	var Δλ = toRadians(lon2 - lon1);

	var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return R * c;
}

$(function () {
	// your code here
	const LOCATION_KEY = 'JS-2-assignment-4-location-key';

	const getLocation = (successCallback) => {
		navigator.geolocation.getCurrentPosition(successCallback);
	};

	/**
	 * @param {number} latitude
	 * @param {number} longitude
	 */
	const showCurrentLocation = (location) => {
		const { latitude, longitude, accuracy } = location.coords;
		const $locationEle = $('div#locationhere');
		const html = `<h4>Your current location:</br> Latitude ${latitude} </br> Longitude ${longitude} </br>Accuracy: ${accuracy}</h4>`;
		$locationEle.html(html);
	};

	/**
	 * @param {number} latitude
	 * @param {number} longitude
	 */
	const showStoredLocation = (location) => {
		const { latitude, longitude, accuracy } = location.coords;
		const $locationEle = $('div#locationhere');
		const html = `<h5 style="color: red">Your last location:</br> Latitude ${latitude} </br>Longitude ${longitude}</br>Accuracy: ${accuracy}</h5>`;
		$locationEle.append(html);
	};

	const showHeaderMessage = (message) => {
		$('header').html(`<h2>${message}</h2>`);
	};

	const showTraveledDistance = (currentLocation, lastLocation) => {
		const { latitude: lat1, longitude: lon1 } = currentLocation.coords;
		const { latitude: lat2, longitude: lon2 } = lastLocation.coords;
		const traveledDistance = calcDistanceBetweenPoints(lat1, lon1, lat2, lon2)/1000;
		const html = `<h4>You have traveled ${traveledDistance} Km</h4>`;
		$('header').append(html);
	};

	/**
	 * @param {string} key
	 * @returns string | null
	 */
	const getLocalStorage = (key) => {
		return localStorage.getItem(key);
	};

	/**
	 * @param {string} key
	 * @param {object} location
	 */
	const setLocalStorage = (key, location) => {
		localStorage.setItem(
			key,
			JSON.stringify({ coords: { latitude: location.coords.latitude, longitude: location.coords.longitude, accuracy: location.coords.accuracy } })
		);
	};

	const onSuccess = (location) => {
		showCurrentLocation(location);
		const storedLocation = getLocalStorage(LOCATION_KEY);

		if (storedLocation) {
			const storedLocationObject = JSON.parse(storedLocation);
			showStoredLocation(storedLocationObject);
			showHeaderMessage('WELCOME BACK');
			showTraveledDistance(location, storedLocationObject);
		} else {
			showHeaderMessage('WELCOME TO THE PAGE');
		}

		setLocalStorage(LOCATION_KEY, location);
	};

	getLocation(onSuccess);
});

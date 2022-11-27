function disableSubmit() {
	const submit = document.getElementById('submit'); // Submit button
	submit.disabled = true;
	submit.className = 'disabled';
}

function enableSubmit() {
	const submit = document.getElementById('submit'); // Submit button
	submit.disabled = false;
	submit.className = 'enabled';
}

function renderCountriesOption() {
	const $optionsArray = countries.map((country) => {
		const $option = $(`<option value="${country.code}">${country.name}</option>`);
		return $option;
	});
	const $countrySelect = $('#countries');
	$countrySelect.append($optionsArray);
}

function setErrorMessage(el, message) {
	$(el).data('errorMessage', message); // Store error message with element
}

function getErrorMessage(el) {
	return $(el).data('errorMessage') || el.title; // Get error message or title of element
}

function showErrorMessage(el) {
	var $el = $(el); // The element with the error
	var errorContainer = $el.siblings('.error.message'); // Any siblings holding an error message

	if (!errorContainer.length) {
		errorContainer = $('<span class="error message"></span>').insertAfter($el);
	}
	errorContainer.text(getErrorMessage(el));
}

function removeErrorMessage(el) {
	const errorContainer = $(el).siblings('.error.message'); // Get the sibling of this form control used to hold the error message
	errorContainer.remove(); // Remove the element that contains the error message
}

// CHECK IF THE ELEMENT IS REQUIRED
function isRequired(el) {
	return (typeof el.required === 'boolean' && el.required) || typeof el.required === 'string';
}

// CHECK IF THE ELEMENT IS EMPTY (or its value is the same as the placeholder text)
function isEmpty(el) {
	return !el.value || el.value === el.placeholder;
}

// CHECK IF THE FIELD IS REQUIRED AND IF SO DOES IT HAVE A VALUE
function validateRequired(el) {
	if (isRequired(el)) {
		var valid = !isEmpty(el); // Is value not empty (true / false)?
		if (!valid) {
			setErrorMessage(el, 'Field is required'); // Set the error message
		}
		return valid; // Return valid variable (true or false)?
	}
	return true; // If not required, all is ok
}

function validatePassword() {
	const password = document.getElementById('password');
	const valid = password.value.length >= 12;
	if (!valid) {
		setErrorMessage(password, 'Please make sure your password contains at least 12 characters');
	}
	return valid;
}

function validatePasswordMatch() {
	const password = document.getElementById('password');
	const confPassword = document.getElementById('conf-password');
	const valid = password.value == confPassword.value;
	if (!valid) {
		setErrorMessage(password, 'Please make sure your password match');
	}
	return valid;
}

function validateConsent() {
	var consent = document.getElementById('consent');
	var valid = consent.checked;
	return valid;
}

function validateSelectCountry() {
	const selectCountryEle = document.getElementById('countries');
	var value = selectCountryEle.value;
	if (value === 'not valid') return false;

	return true;
}

function checkShouldEnableSubmitButton() {
	console.log('run check checkShouldEnableSubmitButton');
	if (validatePassword() && validatePasswordMatch() && validateConsent() && validateSelectCountry()) {
		enableSubmit();
	} else {
		disableSubmit();
	}
}

/** MAIN */
disableSubmit();
renderCountriesOption();
document.forms.register.noValidate = true;
const consentInput = document.getElementById('consent');
consentInput.checked = false;

const $inputElements = $('input');
$inputElements.each(function () {
	$(this).on('change', function () {
		checkShouldEnableSubmitButton();
	});
});

const $selectCountryEle = $('#countries');
$selectCountryEle.on('change', function () {
	checkShouldEnableSubmitButton();
});

// Add submit event
const $form = $('#registerForm');
$form.on('submit', function (e) {
	e.preventDefault(); // Prevent the form being submitted

	let elements = this.elements; // Collection of form controls
	const valid = {}; // Custom valid object
	let isValid; // isValid: checks form controls
	let isFormValid;

	let i;
	for (i = 0, l = elements.length; i < l; i++) {
		isValid = validateRequired(elements[i]);
		if (!isValid) {
			showErrorMessage(elements[i]); // Show error messages
		} else {
			removeErrorMessage(elements[i]); // Remove error messages
		} // End if statement
		valid[elements[i].id] = isValid; // Add element to the valid object
	} // End for loop

	if (!validatePassword()) {
		showErrorMessage(document.getElementById('password')); // Show error message
		valid.password = false; // Update valid object - this element is not valid
	} else {
		removeErrorMessage(document.getElementById('password'));
	}

	if (!validatePasswordMatch()) {
		valid['conf-password'] = false; // Update the valid object - this element is not valid
		const $el = $(document.getElementById('conf-password')); // The element with the error
		var errorContainer = $el.siblings('.error.message'); // Any siblings holding an error message

		if (!errorContainer.length) {
			errorContainer = $('<span class="error message"></span>').insertAfter($el);
		}
		errorContainer.text('password is not matched');
	} else {
		removeErrorMessage(document.getElementById('conf-password'));
	}

	if (!validateConsent()) {
		showErrorMessage(document.getElementById('consent'));
		valid.consent = false;
		const $el = $(document.getElementById('consent'));
		var errorContainer = $el.siblings('.error.message');
		if (!errorContainer.length) {
			errorContainer = $('<span class="error message"></span>').insertAfter($el);
		}
		errorContainer.text('You must accept our terms and conditions');
	} else removeErrorMessage(document.getElementById('consent'));

	if (!validateSelectCountry()) {
		const $el = $(document.getElementById('countries'));
		var errorContainer = $el.siblings('.error.message');

		if (!errorContainer.length) {
			errorContainer = $('<span class="error message"></span>').insertAfter($el);
		}
		errorContainer.text('You must select your country');
		valid.countries = false;
	}

	for (var field in valid) {
		if (!valid[field]) {
			isFormValid = false;
			break;
		}
		isFormValid = true; // The form is valid and OK to submit
	}

	if (!isFormValid) {
		console.log('form is not valid');
	} else {
		const userNameValue = document.getElementById('username').value;
		const selectedCountryValue = document.getElementById('countries').value;
		const $h2Tag = $('#welcomeMessage');
		$h2Tag.empty().text(`Welcome ${userNameValue}! The country code you selected is ${selectedCountryValue}`);

		// CONFETTI
		const duration = 3 * 1000;
		const end = Date.now() + duration;
		(function frame() {
			confetti({
				particleCount: 7,
				angle: 60,
				spread: 55,
				origin: { x: 0 },
			});
			confetti({
				particleCount: 7,
				angle: 120,
				spread: 55,
				origin: { x: 1 },
			});

			if (Date.now() < end) requestAnimationFrame(frame);
		})();
	}
});

function disableSubmit() {
	const submit = document.getElementById('submit'); // Submit button
	submit.disabled = false;
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
		// If no errors exist with the element
		// Create a <span> element to hold the error and add it after the element with the error
		errorContainer = $('<span class="error message"></span>').insertAfter($el);
	}
	errorContainer.text(getErrorMessage(el));
}

function removeErrorMessage(el) {
	const errorContainer = $(el).siblings('.error.message'); // Get the sibling of this form control used to hold the error message
	errorContainer.remove(); // Remove the element that contains the error message
}

// CHECK IF THE ELEMENT IS REQUIRED
// It is called by validateRequired()
function isRequired(el) {
	return (typeof el.required === 'boolean' && el.required) || typeof el.required === 'string';
}

// CHECK IF THE ELEMENT IS EMPTY (or its value is the same as the placeholder text)
// HTML5 browsers do allow users to enter the same text as placeholder, but in this case users should not need to
// It is called by validateRequired()
function isEmpty(el) {
	return !el.value || el.value === el.placeholder;
}

// CHECK IF THE FIELD IS REQUIRED AND IF SO DOES IT HAVE A VALUE
// Relies on isRequired() and isEmpty() both shown below, and setErrorMessage - shown later.
function validateRequired(el) {
	if (isRequired(el)) {
		// Is this element required?
		var valid = !isEmpty(el); // Is value not empty (true / false)?
		if (!valid) {
			// If valid variable holds false
			setErrorMessage(el, 'Field is required'); // Set the error message
		}
		return valid; // Return valid variable (true or false)?
	}
	return true; // If not required, all is ok
}

// Check if the password is less than or equal to 140 characters
function validatePassword() {
	const password = document.getElementById('password');
	const valid = password.value.length >= 12;
	if (!valid) {
		setErrorMessage(password, 'Please make sure your password contains at least 12 characters');
	}
	return valid;
}

// Check that the passwords both match
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

/** MAIN */
disableSubmit();
renderCountriesOption();

document.forms.register.noValidate = true;
// Add submit event
const $form = $('#registerForm');
$form.on('submit', function (e) {
	e.preventDefault(); // Prevent the form being submitted

	let elements = this.elements; // Collection of form controls
	const valid = {}; // Custom valid object
	let isValid; // isValid: checks form controls
	let isFormValid;

	// PERFORM GENERIC CHECKS (calls functions outside the event handler)
	let i;
	for (i = 0, l = elements.length; i < l; i++) {
		// Next line calls validateRequired() validateTypes()
		isValid = validateRequired(elements[i]);
		if (!isValid) {
			// If it does not pass these two tests
			showErrorMessage(elements[i]); // Show error messages
		} else {
			// Otherwise
			removeErrorMessage(elements[i]); // Remove error messages
		} // End if statement
		valid[elements[i].id] = isValid; // Add element to the valid object
	} // End for loop

	if (!validatePassword()) {
		showErrorMessage(document.getElementById('password')); // Show error message
		valid.password = false; // Update valid object - this element is not valid
	} else {
		// Otherwise remove error message
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

	// Loop through valid object, if there are errors set isFormValid to false
	for (var field in valid) {
		// Check properties of the valid object
		if (!valid[field]) {
			// If it is not valid
			isFormValid = false; // Set isFormValid variable to false
			break; // Stop the for loop, an error was found
		} // Otherwise
		isFormValid = true; // The form is valid and OK to submit
	}

	// If the form did not validate, prevent it being submitted
	if (!isFormValid) {
		// If isFormValid is not true
	}
});

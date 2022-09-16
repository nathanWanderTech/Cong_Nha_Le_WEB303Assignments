/**
 * 	WEB 303 Assignment 1 - jQuery
 * 	Student name: Cong Nha Le
 * 	Student ID: 0761950
 */

/**
 * @param {string} amount
 */
const displaySpentAmount = (amount) => {
	$("#amount").text(amount);
};

/**
 *
 * @param {number} salary
 * @param {number} percent
 * @returns string
 */
const calSpentAmount = (salary, percent) => {
	const $errorMess = $("#errorMess");
	if (percent < 0 || percent > 100) {
		$errorMess.show();
		return;
	} else $errorMess.hide();

	const spentAmount = (salary * percent) / 100;
	return `$${spentAmount.toFixed()}`;
};

const handleChange = ($salaryEle, $percentEle) => {
	console.log("something changed");
	const salary = 1 * $salaryEle.val();
	const percent = 1 * $percentEle.val();
	const spentAmount = calSpentAmount(salary, percent);
	displaySpentAmount(spentAmount);
};

$(document).ready(function () {
	const $salaryEle = $("#yearly-salary");
	const $percentEle = $("#percent");

	$salaryEle.on("keyup", function () {
		handleChange($salaryEle, $percentEle);
	});
	$percentEle.on("keyup", function () {
		handleChange($salaryEle, $percentEle);
	});
});

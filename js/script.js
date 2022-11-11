let tableData = [];

function addMyNameIntoH1Tag() {
	$('h1').text('Cong Nha Le - Game of Thrones');
}

function addSearchFirstNameInput() {
	const html =
		"<div style='width: 100%; text-align: right; height: 30px'><label for='searchByFirstName' style='font-size: 16px; margin-right: 10px'>Search by First Name</label><input type='text' name='searchByFirstName'></div>";
	$('body').append(html);
}

function regiserOnSearchFirstNameInput() {
	const $input = $("input[name='searchByFirstName']");
	$input.on('keyup', function (e) {
		const searchKey = e.target.value;
		const results = tableData.map((item) => {
			const firstName = $.trim(item.first_name).toLowerCase();
			if (searchKey != '' && firstName.includes(searchKey)) item.highLight = true;
			else item.highLight = false;
			return item;
		});
		renderTableRows(results);
	});
}

function fetchData() {
	$.ajax({ dataType: 'json', url: 'data.json', success: onSuccess });
}

function renderTableSkeleton() {
	const html =
		'<table><thead><tr><th>First name</th><th>Last name</th><th>Title</th><th>Family</th><th>Gender</th><th>Photo</th></tr></thead><tbody></tbody></table>';
	$('body').append(html);
}

function renderTableRows(data) {
	let html = [];
	data.forEach((item) => {
		const $row = $(`<tr style='${item.highLight && `background: darkgreen; color: white`}'>
        <td>${item.first_name}</td>
        <td>${item.last_name}</td>
        <td>${item.title}</td>
        <td>${item.family}</td>
        <td>${item.gender}</td>
        <td><img src="${item.photo}" alt="${item.first_name}"></td>
    </tr>`);
		html.push($row);
	});
	$('tbody').empty().append(html);
}

function addFilterButton() {
	const $buttonA2M = $('<button id="btnA2M">A - M</button>');
	const $buttonN2Z = $('<button id="btnN2Z">N - Z</button>');
	$buttonA2M.css({ padding: '10px', background: 'yellow', width: 100 });
	$buttonN2Z.css({ padding: '10px', background: 'pink', margin: '20px', width: 100 });
	$buttonA2M.on('click', function () {
		handleFilterBtnA2M(tableData);
	});
	$buttonN2Z.on('click', function () {
		handleFilterBtnN2Z(tableData);
	});
	$('#btnblock').append($buttonA2M).append($buttonN2Z);
}

function handleFilterBtnA2M(dataArr) {
	const regex = /([A-Ma-m])/;
	let count = 0;
	let html = [];
	dataArr.forEach((item) => {
		const $row = $(`<tr style='${item.highLight && `background: darkgreen; color: white`}'>
        <td>${item.first_name}</td>
        <td>${item.last_name}</td>
        <td>${item.title}</td>
        <td>${item.family}</td>
        <td>${item.gender}</td>
        <td><img src="${item.photo}" alt="${item.first_name}"></td>
    </tr>`);
		const firstLetterOfLastName = item.last_name[0];
		if (firstLetterOfLastName.search(regex) === -1) $row.hide();
		else {
			count++;
			$row.show();
		}
		html.push($row);
		$('#btnA2M').text(`A - M (${count})`);
		$('tbody').empty().append(html);
	});
	$('tbody').empty().append(html);
}

function handleFilterBtnN2Z(dataArr) {
	const regex = /([N-Zn-z])/;
	let count = 0;
	let html = [];
	dataArr.forEach((item) => {
		const $row = $(`<tr style='${item.highLight && `background: darkgreen; color: white`}'>
        <td>${item.first_name}</td>
        <td>${item.last_name}</td>
        <td>${item.title}</td>
        <td>${item.family}</td>
        <td>${item.gender}</td>
        <td><img src="${item.photo}" alt="${item.first_name}"></td>
    </tr>`);
		const firstLetterOfLastName = item.last_name[0];
		if (firstLetterOfLastName.search(regex) === -1) $row.hide();
		else {
			count++;
			$row.show();
		}
		html.push($row);
		$('tbody').empty().append(html);
	});
	$('#btnN2Z').text(`N - Z (${count})`);
	$('tbody').empty().append(html);
}

function onSuccess(data) {
	tableData = [...data];
	renderTableRows(tableData);
	addFilterButton();
}

$(document).ready(function () {
	addMyNameIntoH1Tag();
	addSearchFirstNameInput();
	regiserOnSearchFirstNameInput();
	renderTableSkeleton();
	const $buttonsBlock = $('<div id="btnblock"></div>');
	$('body').append($buttonsBlock);
	fetchData();
});

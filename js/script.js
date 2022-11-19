let tableData = [];

/* NOT IMPORTANT FUNCTIONS */
function addMyNameIntoH1Tag() {
	$('h1').text('Cong Nha Le - Game of Thrones - Assignment 9');
}

function renderTableSkeleton() {
	const html = `<table>
	<thead>
		<tr>
			<th data-sort='first_name' data-type='string' order=''>First name <span id='sortIcon'></span></th>
			<th data-sort='last_name' data-type='string' order=''>Last name <span id='sortIcon'></span></th>
			<th data-sort='title' data-type='string' order=''>Title <span id='sortIcon'></span></th>
			<th data-sort='family' data-type='string' order=''>Family <span id='sortIcon'></span></th>
			<th data-sort='gender' data-type='string' order=''>Gender <span id='sortIcon'></span></th>
			<th>Photo</th>
			<th data-sort='debut_date' data-type='datetime' order=''>Debut date <span id='sortIcon'></span></th>
		</tr>
	</thead>
	<tbody>
	</tbody>
	</table>`;
	$('body').append(html);
}

function addSearchFirstNameInput() {
	const html =
		"<div style='width: 100%; text-align: right; height: 30px'><label for='searchByFirstName' style='font-size: 16px; margin-right: 10px'>Search by First Name</label><input type='text' name='searchByFirstName'></div>";
	$('body').append(html);
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

function renderTableRows(data) {
	const html = [];
	data.forEach((item) => {
		const $row = $(`<tr>
        <td>${item.first_name}</td>
        <td>${item.last_name}</td>
        <td>${item.title}</td>
        <td>${item.family}</td>
        <td>${item.gender}</td>
        <td><img src="${item.photo}" alt="${item.first_name}"></td>
				<td>${item.debut_date}</td>
    </tr>`);
		if (item.highLight) $row.css({ background: 'darkgreen', color: 'white' });
		html.push($row);
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
/* END - NOT IMPORTANT FUNCTIONS */

/* Assignment 9 code below */

/**
 * Reset all order attribute back to default before set new order attrbute value for current clicked column
 */
function resetAllOrderAttributeToDefault() {
	const $thElements = $('th');
	$thElements.each(function () {
		const $thEle = $(this);
		$thEle.attr('order', '');
	});
}

function handleAddSortIcon() {
	const $thElements = $('th');
	const iconUp = '<i class="fas fa-chevron-up"></i>';
	const iconDown = '<i class="fas fa-chevron-down"></i>';
	$thElements.each(function () {
		const $thEle = $(this);
		const sortOrder = $thEle.attr('order');
		if (sortOrder === 'ASC') {
			$thEle.children().empty().html(iconUp);
		} else if (sortOrder === 'DESC') {
			$thEle.children().empty().html(iconDown);
		} else {
			$thEle.children().empty();
		}
	});
}

function sortDataTypeString(rawData, $thEle) {
	const sortByKey = $thEle.attr('data-sort');
	const currentOrder = $thEle.attr('order');

	if (currentOrder === 'ASC') {
		// Apply sort DESC
		const sortedDataDESC = rawData.sort((character1, character2) => {
			const valueToCompare1 = character1[sortByKey].toLowerCase();
			const valueToCompare2 = character2[sortByKey].toLowerCase();
			if (valueToCompare1 < valueToCompare2) return 1;
			if (valueToCompare1 > valueToCompare2) return -1;
			return 0;
		});
		resetAllOrderAttributeToDefault();
		$thEle.attr('order', 'DESC');
		renderTableRows(sortedDataDESC);
	} else if (currentOrder === 'DESC') {
		// Reset to default no Sort
		renderTableRows(rawData);
		resetAllOrderAttributeToDefault();
	} else {
		// Apply sort ASC
		const sortedDataASC = rawData.sort((character1, character2) => {
			const valueToCompare1 = character1[sortByKey].toLowerCase();
			const valueToCompare2 = character2[sortByKey].toLowerCase();
			if (valueToCompare1 < valueToCompare2) return -1;
			if (valueToCompare1 > valueToCompare2) return 1;
			return 0;
		});
		resetAllOrderAttributeToDefault();
		$thEle.attr('order', 'ASC');
		renderTableRows(sortedDataASC);
	}
	handleAddSortIcon();
}

function sortDataTypeDatetime(rawData, $thEle) {
	const sortByKey = $thEle.attr('data-sort');
	const currentOrder = $thEle.attr('order');
	if (currentOrder === 'ASC') {
		// Apply sort DESC
		const sortedDataDESC = rawData.sort((character1, character2) => {
			const date1 = new Date(character1[sortByKey]);
			const date2 = new Date(character2[sortByKey]);
			return date2 - date1;
		});
		resetAllOrderAttributeToDefault();
		$thEle.attr('order', 'DESC');
		renderTableRows(sortedDataDESC);
	} else if (currentOrder === 'DESC') {
		// Reset to default no Sort
		renderTableRows(rawData);
		resetAllOrderAttributeToDefault();
	} else {
		// Apply sort ASC
		const sortedDataASC = rawData.sort((character1, character2) => {
			const date1 = new Date(character1[sortByKey]);
			const date2 = new Date(character2[sortByKey]);
			return date1 - date2;
		});
		resetAllOrderAttributeToDefault();
		$thEle.attr('order', 'ASC');
		renderTableRows(sortedDataASC);
	}
	handleAddSortIcon();
}

function assignSortIntoTH() {
	const $thElements = $('th');
	$thElements.each(function () {
		const $thEle = $(this);
		const dataType = $thEle.attr('data-type');
		const sortByKey = $thEle.attr('data-sort');

		if (sortByKey != undefined) {
			if (dataType === 'string') {
				$thEle.on('click', function () {
					sortDataTypeString([...tableData], $thEle);
				});
			}
			if (dataType === 'datetime') {
				$thEle.on('click', function () {
					sortDataTypeDatetime([...tableData], $thEle);
				});
			}
		} else {
			// Do nothing because unsorable column
		}
	});
}

/* END - Assignment 9 code below */

$(document).ready(function () {
	addMyNameIntoH1Tag();
	addSearchFirstNameInput();
	regiserOnSearchFirstNameInput();
	renderTableSkeleton();
	const $buttonsBlock = $('<div id="btnblock"></div>');
	$('body').append($buttonsBlock);
	fetchData();
	// Assingment 9
	assignSortIntoTH();
});

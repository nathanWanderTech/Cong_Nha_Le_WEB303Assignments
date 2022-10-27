/*
    Assignment 05
    Student: Cong Nha Le - 0761950
*/

const redRanger = new ContentItem(1, 'Red Ranger', "Red Ranger is the team's first leader.", 'Male ranger');
const blueRanger = new ContentItem(2, 'Blue Ranger', "Blue Ninja Ranger; also becomes the longest-lasting member of the original team.", 'Male ranger');
const blackRanger = new ContentItem(3, 'Black Ranger', "He wields the Power Axe, and pilots the Mastodon Dinozord and the Lion", 'Male ranger');
const yellowRanger = new ContentItem(4, 'Yello Ranger', "Power Daggers, and pilots the Saber-Toothed Tiger Dinozord and the Griffin Thunderzord", 'Female ranger');
const pinkRanger = new ContentItem(5, 'Pink Ranger', " The first Pink Ninja Ranger. She wields the Power Bow, and pilots the Pterodactyl Dinozord", 'Female ranger');

const rangersArr = [redRanger, blueRanger, blackRanger, yellowRanger, pinkRanger];

$(document).ready(function () {
	// your code here
	$contentBlock = $('div#content-item-list');
	rangersArr.forEach((item) => {
		const $node = $($.parseHTML(item.toString()));
		$node.css({ border: '1px solid blue', width: '300px', padding: '10px', margin: '10px auto' });
		$contentBlock.append($node);
	});
});

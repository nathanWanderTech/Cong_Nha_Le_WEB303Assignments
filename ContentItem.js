class ContentItem {
	id;
	name;
	description;
	categoryGenre;

	constructor(id, name, description, categoryGenre) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.categoryGenre = categoryGenre;
	}

	updateContentItem(id, name, description, categoryGenre) {
		if (id === this.id) {
			if (name != null) this.name = name;
			if (description != null) this.description = description;
			if (categoryGenre != null) this.categoryGenre = categoryGenre;
		}
	}

	toString() {
		return `<div id="content-item-${this.id}"><h4>${this.name}</h4><p>${this.description}</p><div>${this.categoryGenre}</div></div>`;
	}
}

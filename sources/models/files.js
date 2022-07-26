// const myChangeDate = webix.Date.dateToStr("%Y-%m-%d %H:%i");

export const files = new webix.DataCollection({
	// url: ,
	// save: "rest-> ",
	data: [{id: 1, name: "File1.pdf", lastModifiedDate: new Date(), sizetext: "23 MB", ContactID: 1},
		{id: 2, name: "Fil2e.pdf", lastModifiedDate: new Date(), sizetext: "245 MB", ContactID: 2},
		{id: 3, name: "File3.pdf", lastModifiedDate: new Date(), sizetext: "239 MB", ContactID: 3},
		{id: 4, name: "File4.pdf", lastModifiedDate: new Date(), sizetext: "2 MB", ContactID: 1}]
});

export default files;

const myDate = webix.Date.dateToStr("%Y-%m-%d %H:%i");

const contacts = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/contacts/",
	save: "rest->http://localhost:8096/api/v1/contacts/",
	scheme: {
		$init: (obj) => {
			obj.value = `${obj.FirstName} ${obj.LastName}`;
			obj.Birthday = new Date(obj.Birthday);
			obj.StartDate = new Date(obj.StartDate);
		},
		$save: (obj) => {
			obj.Birthday = myDate(obj.Birthday);
			obj.StartDate = myDate(obj.StartDate);
		}
	}
});

export default contacts;

const myDate = webix.Date.dateToStr("%Y-%m-%d %H:%i");
const templateDate = webix.Date.dateToStr("%Y-%m-%d");

const contacts = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/contacts/",
	save: "rest->http://localhost:8096/api/v1/contacts/",
	scheme: {
		$init: (obj) => {
			obj.value = `${obj.FirstName} ${obj.LastName}`;
			obj.Birthday = templateDate(obj.Birthday);
		},
		$update: (obj) => {
			obj.Birthday = templateDate(obj.Birthday);
		},
		$save: (obj) => {
			obj.Birthday = myDate(obj.Birthday);
			obj.StartDate = myDate(obj.StartDate);
		}
	}
});

export default contacts;

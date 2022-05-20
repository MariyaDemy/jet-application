const mydate = webix.Date.dateToStr("%Y-%m-%d");
const mytime = webix.Date.dateToStr("%h:%i");

const activities = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/activities/",
	save: "rest->http://localhost:8096/api/v1/activities/",
	scheme: {
		$init(obj) {
			obj.Date = new Date(obj.DueDate);
			obj.Time = new Date(obj.DueDate);
		},
		$save: (obj) => {
			const date = mydate(obj.Date);
			const time = mytime(obj.Time);
			obj.DueDate = `${date} ${time}`;
		}}
});

export default activities;

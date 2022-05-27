export const mydate = webix.Date.dateToStr("%Y-%m-%d");
export const mytime = webix.Date.dateToStr("%H:%i:%s");
const myDueDate = webix.Date.dateToStr("%Y-%m-%d %H:%i");

export const activities = new webix.DataCollection({
	url: "http://localhost:8096/api/v1/activities/",
	save: "rest->http://localhost:8096/api/v1/activities/",
	scheme: {
		$init(obj) {
			obj.Date = new Date(obj.DueDate);
			obj.Time = new Date(obj.DueDate);
			obj.DueDate = new Date(obj.DueDate);
		},
		$update: (obj) => {
			const date = mydate(obj.Date);
			const time = mytime(obj.Time);
			obj.DueDate = new Date(`${date}T${time}`);
		},
		$save: (obj) => {
			obj.DueDate = myDueDate(obj.DueDate);
			delete obj.Date;
			delete obj.Time;
		}
	}
});

export default activities;

import {JetView} from "webix-jet";

import activitiesData from "../models/activities";
import activitytypesData from "../models/activitytypes";
import contactsData from "../models/contacts";
import PopUp from "./popup";

export default class ActivityTable extends JetView {
	config() {
		let activityBtn = {
			view: "button",
			width: 200,
			height: 50,
			type: "icon",
			icon: "mdi mdi-plus-outline",
			label: "Add activity",
			click: () => this.Popup.showPopUp()
		};

		let activityTable = {
			view: "datatable",
			localId: "activityTable",
			select: "cell",
			scrollX: false,
			columns: [
				{id: "State",
					header: "",
					template: "{common.checkbox()}",
					width: 40,
					checkValue: "Close",
					uncheckValue: "Open"
				},
				{
					id: "TypeID",
					header: ["Activity Type", {content: "selectFilter"}],
					collection: activitytypesData,
					sort: "text",
					fillspace: true
				},
				{
					id: "DueDate",
					header: ["Due date", {content: "dateRangeFilter"}],
					sort: "date",
					format: webix.Date.dateToStr("%Y-%m-%d %H:%i"),
					fillspace: true
				},
				{
					id: "Details",
					header: ["Details", {content: "textFilter"}],
					sort: "text",
					fillspace: true
				},
				{
					id: "ContactID",
					header: ["Contact", {content: "selectFilter"}],
					collection: contactsData,
					sort: "text",
					fillspace: true
				},
				{header: "", template: "<span class='mdi mdi-square-edit-outline'></span>"},
				{header: "", template: "<span class='mdi mdi-trash-can-outline'></span>"}

			],
			onClick: {
				"mdi-trash-can-outline": function (event, id) {
					webix.confirm({
						title: "Delete activity",
						text: "Do you really want to delete this record?"
					}).then(() => {
						activitiesData.remove(id);
						return false;
					}).fail(() => {
						this.unselect(id);
					});
				},
				"mdi-square-edit-outline": (event, id) => {
					this.Popup.showPopUp(id);
				}
			}
		};

		return {rows: [
			{padding: 10, cols: [{}, activityBtn]},
			activityTable
		]};
	}

	init() {
		this.$$("activityTable").sync(activitiesData);
		activitiesData.filter();
		this.Popup = this.ui(PopUp);
	}
}

import {JetView} from "webix-jet";

import activitiesData from "../models/activities";
import activitytypesData from "../models/activitytypes";
import contactsData from "../models/contacts";

export default class PopUp extends JetView {
	config() {
		return {
			view: "window",
			localId: "activityPopUp",
			head: {localId: "header", template: obj => (obj ? `${obj} activity` : "")},
			body: {
				view: "form",
				localId: "activityForm",
				elements: [
					{
						view: "textarea",
						height: 150,
						label: "Details",
						name: "Details"
					},
					{
						view: "combo",
						label: "Type",
						options: activitytypesData,
						name: "TypeID",
						required: true
					},
					{
						view: "combo",
						label: "Contact",
						options: contactsData,
						name: "ContactID",
						required: true
					},
					{
						cols: [
							{
								view: "datepicker",
								label: "Date",
								format: "%Y-%m-%d",
								name: "Date"
							},
							{
								view: "datepicker",
								type: "time",
								label: "Time",
								format: "%h:%i",
								name: "Time"
							}
						]
					},
					{
						view: "checkbox",
						label: "Completed",
						checkValue: "Close",
						uncheckValue: "Open",
						name: "State"
					},
					{margin: 20,
						cols: [
							{},
							{
								view: "button",
								localId: "saveBtn",
								css: "webix_primary",
								width: 100,
								height: 45,
								click: () => this.saveData()
							},
							{
								view: "button",
								value: "Cancel",
								width: 100,
								height: 45,
								click: () => this.hidePopUp()
							}]}

				],
				rules: {
					Details: webix.rules.isNotEmpty,
					Date: webix.rules.isNotEmpty,
					Time: webix.rules.isNotEmpty
				}
			},
			position: "center",
			maxWidth: 750,
			height: 500
		};
	}

	init() {
		this.Header = this.$$("header");
		this.Btn = this.$$("saveBtn");
		this.Form = this.$$("activityForm");
	}

	showPopUp(title, btn, id) {
		this.Btn.setValue(btn);
		this.Header.setValues(title);
		const values = activitiesData.getItem(id);
		if (id) {
			this.Form.setValues(values);
		}
		this.getRoot().show();
	}

	hidePopUp() {
		this.getRoot().hide();
		this.Form.clear();
	}

	saveData() {
		if (this.Form.validate()) {
			const values = this.Form.getValues();
			if (values.id) {
				activitiesData.updateItem(values.id, values);
				this.getRoot().hide();
				this.Form.clear();
			}
			else {
				activitiesData.add(values);
				this.Form.clear();
			}
		}
	}
}

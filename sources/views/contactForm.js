import {JetView} from "webix-jet";

import contactsData from "../models/contacts";
import statusesData from "../models/statuses";

export default class ContactForm extends JetView {
	config() {
		let header = {
			type: "header",
			localId: "header",
			template: "contact",
			css: "webix_header app_header"
		};

		let form = {
			view: "form",
			localId: "contactForm",
			cols: [
				{rows: [{
					view: "text",
					label: "First name",
					name: "FirstName"
				},
				{
					view: "text",
					label: "Last name",
					name: "LastName"
				},
				{
					view: "datepicker",
					label: "Joining date",
					format: "%d %M %Y",
					name: "StartDate"
				},
				{
					view: "richselect",
					label: "Status",
					options: {
						body: {
							template: "#Value#"
						},
						data: statusesData
					},
					name: "StatusID"
					// required: true
				},
				{
					view: "text",
					label: "Job",
					name: "Job"
				},
				{
					view: "text",
					label: "Company",
					name: "Company"
				},
				{
					view: "text",
					label: "Website",
					name: "Website"
				},
				{
					view: "textarea",
					label: "Adress",
					name: "Address"
				}
				]},
				{rows: [
					{
						view: "text",
						label: "Email",
						name: "Email"
					},
					{
						view: "text",
						label: "Skype",
						name: "Skype"
					}, {
						view: "text",
						label: "Phone",
						name: "Phone"
					},
					{
						view: "datepicker",
						label: "Birthday",
						format: "%d %M %Y",
						name: "Birthday"
					},
					{cols: [{
						template: "photo"
					}, {
						rows: [
							{view: "button",
								value: "Change photo"},
							{view: "button",
								value: "Delete photo"}
						]
					}]}
				]}

			]
			// rules: {
			// }
		};

		return {
			// gravity: 5,
			rows: [header, form, {padding: 10,
				cols: [{}, {view: "button",
					value: "Cancel",
					width: 100,
					click: () => this.cancelData()
				},
				{view: "button", localId: "saveBtn", width: 100, click: () => this.saveData()}]}, {}]
		};
	}

	init() {
		this.Form = this.$$("contactForm");
		this.Header = this.$$("header");
		this.Btn = this.$$("saveBtn");

		this.on(this.app, "onFormShow", (id) => { //
			console.log(id);
			this.setValues(id);
		});
	}

	setValues(id) {
		console.log(id);
		this.show("contactForm"); //
	}

	saveData() {
		if (this.Form.validate()) {
			const values = this.Form.getValues();
			if (values.id) {
				contactsData.updateItem(values.id, values);
				this.show("contactCard");
			}
			else {
				contactsData.waitSave(() => contactsData.add(values))
					.then(() => {
						this.app.callEvent("selectLastItem");
					})
					.then(() => {
						this.show("contactCard");
					});
			}
			this.Form.clear();
		}
	}

	cancelData() {
		this.Form.clear();
		this.app.callEvent("selectFirstItem");
		this.show("contactCard");
	}
}

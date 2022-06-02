import {JetView} from "webix-jet";

import contactsData from "../models/contacts";
import statusesData from "../models/statuses";

export default class ContactForm extends JetView {
	config() {
		let header = {
			type: "header",
			localId: "header",
			template: obj => `${obj} contact`,
			css: "form-header"
		};

		let form = {
			view: "form",
			localId: "contactForm",
			cols: [
				{rows: [{
					view: "text",
					label: "First name",
					name: "FirstName",
					inputWidth: 300
				},
				{
					view: "text",
					label: "Last name",
					name: "LastName",
					inputWidth: 300
				},
				{
					view: "datepicker",
					label: "Joining date",
					format: "%d %M %Y",
					name: "StartDate",
					inputWidth: 300
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
					name: "StatusID",
					inputWidth: 300
					// required: true
				},
				{
					view: "text",
					label: "Job",
					name: "Job",
					inputWidth: 300
				},
				{
					view: "text",
					label: "Company",
					name: "Company",
					inputWidth: 300
				},
				{
					view: "text",
					label: "Website",
					name: "Website",
					inputWidth: 300
				},
				{
					view: "textarea",
					label: "Adress",
					name: "Address",
					inputWidth: 300,
					inputHeight: 75
				}
				]},
				{rows: [
					{
						view: "text",
						label: "Email",
						name: "Email",
						inputWidth: 300
					},
					{
						view: "text",
						label: "Skype",
						name: "Skype",
						inputWidth: 300
					}, {
						view: "text",
						label: "Phone",
						name: "Phone",
						inputWidth: 300
					},
					{
						view: "datepicker",
						label: "Birthday",
						format: "%d %M %Y",
						name: "Birthday",
						inputWidth: 300
					},
					{cols: [{
						template: "photo",
						height: 200,
						width: 200
					}, {padding: 30,
						rows: [
							{view: "button",
								value: "Change photo",
								inputWidth: 150},
							{view: "button",
								value: "Delete photo",
								inputWidth: 150}
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
					width: 200,
					click: () => this.cancelData()
				},
				{view: "button", localId: "saveBtn", width: 200, click: () => this.saveData()}]}, {}]
		};
	}

	init() {
		this.Form = this.$$("contactForm");
		this.Header = this.$$("header");
		this.Btn = this.$$("saveBtn");

		this.on(this.app, "onFormShow", (id) => {
			if (id) {
				const values = contactsData.getItem(id);
				this.Form.setValues(values);
				this.setValues(id);
			}
			else {
				this.setValues();
			}
		});
	}

	setValues(id) {
		this.Header.setValues(id ? "Edit" : "Add new");
		this.Btn.setValue(id ? "Save" : "Add");
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
		const values = this.Form.getValues();
		if (!values.id) {
			this.app.callEvent("selectFirstItem");			
		} 
		this.show("contactCard");
		this.Form.clear();		
	}
}

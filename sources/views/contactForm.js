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
					required: true
				},
				{
					view: "text",
					label: "Last name",
					name: "LastName",
					required: true
				},
				{
					view: "datepicker",
					label: "Joining date",
					format: "%d %M %Y",
					name: "StartDate",
					required: true
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
				},
				{
					view: "text",
					label: "Job",
					name: "Job",
					required: true
				},
				{
					view: "text",
					label: "Company",
					name: "Company",
					required: true
				},
				{
					view: "text",
					label: "Website",
					name: "Website"
				},
				{
					view: "textarea",
					label: "Adress",
					name: "Address",
					inputHeight: 75
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
						name: "Birthday",
						required: true
					},
					{cols: [{
						localId: "photoTemplate",
						template: obj => `<div><img class='ava-photo' src=${obj.Photo ||
						"./sources/imgs/mrcat.jpg"} alt="Avatar"/></div>`,
						height: 200,
						maxWidth: 200,
						borderless: true
					}, {padding: 30,
						rows: [
							{view: "uploader",
								localId: "photoUploader",
								value: "Change photo",
								autosend: false,
								accept: "image/png, image/gif, image/jpeg",
								multiple: false,
								upload: contactsData,
								on: {onBeforeFileAdd: upload => this.uploadPhoto(upload)
									// 	onAfterFileAdd: ()=>{
									// 	$$("photoUploader").send();
									//    }
								}
							},
							{view: "button",
								value: "Delete photo"
							}
						]
					}]}
				]}

			],
			rules: {
				FirstName: webix.rules.isNotEmpty,
				LastName: webix.rules.isNotEmpty,
				Job: webix.rules.isNotEmpty,
				Company: webix.rules.isNotEmpty

			},
			elementsConfig: {
				labelWidth: 100
			}
		};

		return {
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

	uploadPhoto(upload) {
		let file = upload.file;
		let reader = new FileReader();
		reader.onload = (event) => {
			this.$$("photoTemplate").setValues({Photo: event.target.result});
		};
		reader.readAsDataURL(file);
		return false;
	}
}

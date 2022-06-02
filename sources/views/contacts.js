import {JetView} from "webix-jet";

import contactsData from "../models/contacts";
// import ContactCard from "./contactCard";

export default class Contacts extends JetView {
	config() {
		let list = {
			view: "list",
			localId: "contactsList",
			type: {
				template: obj => `<div class='contact'>
					<div><img class='avatar' src=${obj.Photo || "./sources/imgs/mrcat.jpg"} alt="${obj.FirstName}"/></div>
					<div class='wrap'><div>${obj.FirstName} ${obj.LastName}</div><div>${obj.Company}</div></div>
					</div>`,
				height: 60
			},
			select: true,
			css: "contactslist",
			on: {
				onAfterSelect: (id) => {
					this.setParam("id", id, true);
					this.show("contactCard");
				}
			}
		};

		let contactBtn = {
			view: "button",
			width: 200,
			height: 40,
			type: "icon",
			icon: "mdi mdi-plus-outline",
			label: "Add contact",
			click: () => {
				this.show("contactForm").then(() => this.app.callEvent("onFormShow")); // onFormShow is in contactForm.js
			}
		};

		let ui = {
			type: "line",
			css: "app_layout",
			cols: [{rows: [list, contactBtn]},
				{$subview: true}
			]
		};

		return ui;
	}

	init() {
		this.List = this.$$("contactsList");
		this.$$("contactsList").sync(contactsData);
		this.on(this.app, "selectFirstItem", () => this.List.select(this.List.getFirstId()));
		this.on(this.app, "selectLastItem", () => this.List.select(this.List.getLastId()));
		this.on(this.app, "onEditClick", (id) => {
			this.show("contactForm").then(() => this.app.callEvent("onFormShow", [id]));	// onFormShow is in contactForm.js
		});
	}

	urlChange() {
		contactsData.waitData.then(() => {
			const id = this.getParam("id");
			if (id) {
				this.List.select(id);
			}
			else {
				this.List.select(this.List.getFirstId());
			}
		});
	}
}

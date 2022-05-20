import {JetView} from "webix-jet";

import contactsData from "../models/contacts";
import ContactCard from "./contactCard";

export default class Contacts extends JetView {
	config() {
		let list = {
			view: "list",
			localId: "contactsList",
			gravity: 1,
			type: {
				template: obj => `<div class='contact'>
					<div><img class='avatar' src=${obj.Photo || "./sources/imgs/mrcat.jpg"} alt="${obj.FirstName}"/></div>
					<div class='wrap'><span>${obj.FirstName} ${obj.LastName}</span><span>${obj.Company}</span></div>
					</div>`,
				height: 80
			},
			scroll: false,
			select: true,
			css: "contactslist",
			on: {
				onAfterSelect: (id) => {
					this.setParam("id", id, true);
				}
			}
		};

		let ui = {
			type: "line",
			css: "app_layout",
			cols: [list,
				{$subview: ContactCard}
			]
		};

		return ui;
	}

	init() {
		this.$$("contactsList").sync(contactsData);
	}

	urlChange() {
		contactsData.waitData.then(() => {
			const list = this.$$("contactsList");
			const id = this.getParam("id");
			if (id) {
				list.select(id);
			}
			else {
				list.select(list.getFirstId());
			}
		});
	}
}

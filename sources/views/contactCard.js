import {JetView} from "webix-jet";

import contactsData from "../models/contacts";
import statusesData from "../models/statuses";

export default class ContactCard extends JetView {
	config() {
		let cardInfo = {
			view: "template",
			localId: "contactCard",
			gravity: 2,
			template: obj => `
				<h2 class="name">${obj.FirstName} ${obj.LastName}</h2>
				<div class="inner">
					<div class="wrapper">
					<img class='photo' src=${obj.Photo || "./sources/imgs/mrcat.jpg"} alt="${obj.FirstName}"/>
					<p class='status'>${obj.Status || ""}</p>
					</div>
					<div class='cols'>
					<div class='firstcol'>
					<p><span class="webix_icon mdi mdi-email"></span><span>${obj.Email}</span></p>
					<p><span class="webix_icon mdi mdi-skype"></span><span>${obj.Skype}</span></p>
					<p><span class="webix_icon mdi mdi-finance"></span><span>${obj.Job || "-"}</span></p>
					<p><span class="webix_icon mdi mdi-email"></span><span>${obj.Company}</span></p>
					</div>
					<div>
					<p><span class="webix_icon mdi mdi-calendar-range"></span><span>${obj.Birthday || "Not specified"}</span></p>
					<p><span class="webix_icon mdi mdi-map-marker"></span><span>${obj.Address || "Not specified"}</span></p>
					</div>
					</div>								
				</div>
				`
		};

		let cardBtns = {
			padding: 5,
			rows: [{
				cols: [{
					view: "button",
					label: "Delete",
					width: 100,
					type: "icon",
					icon: "mdi mdi-trash-can-outline"

				},
				{
					view: "button",
					label: "Edit",
					width: 100,
					type: "icon",
					icon: "mdi mdi-square-edit-outline",
					click: () => this.editData()
				}]
			}, {}]

		};

		let activityBtn = {
			view: "button",
			width: 200,
			height: 40,
			type: "icon",
			icon: "mdi mdi-plus-outline",
			label: "Add activity"
			// click: () =>
		};

		return {
			gravity: 5,
			rows: [{cols: [cardInfo, cardBtns]}, {cols: [{}, activityBtn]}]
		};
	}

	// init() {

	// }

	urlChange() {
		webix.promise.all([
			contactsData.waitData,
			statusesData.waitData
		]).then(() => {
			let id = this.getParam("id", true);
			if (id) {
				const contact = webix.copy(contactsData.getItem(id));
				if (contact.StatusID && statusesData.exists(contact.StatusID)) {
					contact.Status = statusesData.getItem(contact.StatusID).Value;
				}
				this.$$("contactCard").parse(contact);
			}
		});
	}

	editData() {
		let id = this.getParam("id", true);

		this.app.callEvent("onFormShow", [id]);
		this.show("contactForm");
	}
}

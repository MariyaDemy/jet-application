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
					<p><span class="webix_icon mdi mdi-calendar-range"></span><span>${obj.Birthday}</span></p>
					<p><span class="webix_icon mdi mdi-map-marker"></span><span>${obj.Address || "Not specified"}</span></p>
					</div>
					</div>								
				</div>
				`
		};

		let cardBtns = {
			padding: 10,
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
					icon: "mdi mdi-square-edit-outline"
				}]
			}, {}]

		};

		return {
			gravity: 5,
			padding: 10,
			rows: [{cols: [cardInfo, cardBtns]}]
		};
	}

	urlChange() {
		webix.promise.all([
			contactsData.waitData,
			statusesData.waitData
		]).then(() => {
			const id = this.getParam("id", true);
			if (id) {
				const contact = webix.copy(contactsData.getItem(id));
				if (contact.StatusID && statusesData.exists(contact.StatusID)) {
					contact.Status = statusesData.getItem(contact.StatusID).Value;
				}
				this.$$("contactCard").parse(contact);
			}
		});
	}
}

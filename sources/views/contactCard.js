import {JetView} from "webix-jet";

import activitiesData from "../models/activities";
import contactsData from "../models/contacts";
import filesData from "../models/files";
import statusesData from "../models/statuses";
import ContactTabview from "./contactTabview";

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
					<div class='secondcol'>
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
					icon: "mdi mdi-trash-can-outline",
					click: () => this.deleteData()

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

		return {
			gravity: 5,
			rows: [{cols: [cardInfo, cardBtns]}, {$subview: ContactTabview}]
		};
	}

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
		if (id) {
			this.app.callEvent("onEditClick", [id]); // onEditClick is in contacts.js
		}
	}

	deleteData() {
		let id = this.getParam("id", true);
		webix.confirm({
			title: "Delete the contact",
			text: "Deleting cannot be undone"
		}).then(() => {
			contactsData.waitData.then(() => {
				if (contactsData.exists(id))	{
					const activities = activitiesData.find(obj => +obj.ContactID === +id);
					const files = filesData.find(obj => +obj.ContactID === +id);
					activities.forEach(elem => activitiesData.remove(elem.id));
					files.forEach(elem => filesData.remove(elem.id));
					contactsData.remove(id);
					this.app.callEvent("selectFirstItem");
				}
				else {
					this.app.show("top/contacts");
				}
				return false;
			});
		});
	}
}

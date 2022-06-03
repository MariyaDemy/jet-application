import {JetView} from "webix-jet";

import contactsData from "../models/contacts";
import statusesData from "../models/statuses";
import activitiesData from "../models/activities";
import activitytypesData from "../models/activitytypes";
import PopUp from "./popup";

export default class ActivitiesTable extends JetView {
	config() {
		return {            
                view: "datatable",
                localId: "activitiesTable",
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
                        header: ["", {content: "selectFilter"}],
                        collection: activitytypesData,
                        sort: "text",
                        fillspace: true
                    },
                    {
                        id: "DueDate",
                        header: ["", {content: "dateRangeFilter"}],
                        sort: "date",
                        format: webix.Date.dateToStr("%Y-%m-%d %H:%i"),
                        fillspace: true
                    },
                    {
                        id: "Details",
                        header: ["", {content: "textFilter"}],
                        sort: "text",
                        fillspace: true
                    },
                    {header: "", template: "<span class='mdi mdi-square-edit-outline'></span>", width: 45,},
                    {header: "", template: "<span class='mdi mdi-trash-can-outline'></span>", width: 45,}
    
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
        }
    }

    init() {
        this.Table = this.$$("activitiesTable");    
		this.Table.sync(activitiesData);
        //this.ContactID = this.getParam("id", true);
        this.Popup = this.ui(PopUp); 
      
      
        // let id = this.getParam("id", true);
		// 	if (id) {
		// 	activitiesData.filter((obj) => obj.ContactID.toString() === id.toString())
		// 	}
            // this.on(activitiesData, "onAfterAdd", () => {
            //     console.log("updated")
            //     //activitiesData.filter((obj) => obj.ContactID.toString() === id.toString())
            // });
	}

    urlChange() {
        webix.promise.all([
			activitiesData.waitData,
			activitytypesData.waitData
		]).then(() => {
			let id = this.getParam("id", true);
			if (id) {
			activitiesData.filter((obj) => obj.ContactID.toString() === id.toString())
			} 
		});       
    }
	
}
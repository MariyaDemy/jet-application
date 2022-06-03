import {JetView} from "webix-jet";

import contactsData from "../models/contacts";
import statusesData from "../models/statuses";
import activitiesData from "../models/activities";
import activitytypesData from "../models/activitytypes";

export default class FilesTable extends JetView {
	config() {
		return {            
            view: "datatable",
            localId: "filesTable",
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
                {header: "", template: "<span class='mdi mdi-square-edit-outline'></span>"},
                {header: "", template: "<span class='mdi mdi-trash-can-outline'></span>"}

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
            }
    }
    }
	
}
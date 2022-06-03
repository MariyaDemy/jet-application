import {JetView} from "webix-jet";

//import contactsData from "../models/contacts";
//import statusesData from "../models/statuses";
import ActivitiesTable from "./activitiesTable";
import FilesTable from "./filesTable";
import PopUp from "./popup";

export default class ContactTabview extends JetView {
	config() {

        let activityBtn = {
            view: "button",
            width: 200,
            height: 40,
            type: "icon",
            icon: "mdi mdi-plus-outline",
            label: "Add activity",
            click: () => this.Popup.showPopUp()
        }

        let uploadBtn = {
            view: "button",
            width: 200,
            height: 40,
            type: "icon",
            icon: "mdi mdi-cloud-upload-outline",
            label: "Upload file"
            // click: () =>
        }
		
        return {
        view:"tabview",
        cells:[     
        {
        header:"Activities",
        body: {rows: [ActivitiesTable, 
            {cols: [{}, activityBtn]}
        ]}            
        },
        { header:"Files", 
        body: {rows: [FilesTable, 
            {cols: [{}, uploadBtn]}
        ]}   
        }]}

	}

    init(){
        this.Popup = this.ui(PopUp);      
    }	
}

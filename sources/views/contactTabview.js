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
        body: FilesTable,   
        }]}

	}

    init(){
        this.Popup = this.ui(PopUp);      
    }	
}

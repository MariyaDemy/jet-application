import {JetView} from "webix-jet";

import filesData from "../models/files";

export default class FilesTable extends JetView {
	config() {

        let uploadBtn = {
            view:"uploader",
            label:"Upload file",
            width: 200,
            height: 40,
            type: "icon",
			icon: "mdi mdi-cloud-upload",
            on: {
				onBeforeFileAdd: (file) => {
                    let id = this.getParam("id", true);
					file.ContactID = id;
                    file.lastModifiedDate = file.file.lastModifiedDate;
					filesData.add(file);
                    filesData.filter((obj) => obj.ContactID.toString() === id.toString())
					return false;
				},
                onFileUploadError: () => webix.message({text: 'File could not be uploaded for some reason'})
			}
        }

		let filesTable = {            
            view: "datatable",
            localId: "filesTable",
            type: "uploader",
            select: "cell",
            scrollX: false,
            columns: [
                {
					id: "name",
					header: "Name",
					sort: "text",
					fillspace: true
				},
                {
					id: "lastModifiedDate",
					header: "Change date",
					sort: "date",
					format: webix.Date.dateToStr("%j %M %Y"),
                    fillspace: true
				},
				{
					id: "sizetext",
					header: "Size",
                    sort: "text", // should be sorted by file sizes
                    fillspace: true
				},
                {header: "Del", template: "<span class='mdi mdi-trash-can-outline'></span>", width: 60,}

            ],
            onClick: {
                "mdi-trash-can-outline": function (event, id) {
                    webix.confirm({
                        title: "Delete file",
                        text: "Do you really want to delete this file?"
                    }).then(() => {
                        filesData.remove(id);
                        return false;
                    }).fail(() => {
                        this.unselect(id);
                    });
                },
            },
    }
            return {rows: [filesTable, 
                {cols: [{}, uploadBtn, {}]}]}
    }

    init(){
        this.Table = this.$$("filesTable");    
		this.Table.sync(filesData);
    }

    urlChange() {
        let id = this.getParam("id", true);
		if (id) {
		filesData.filter((obj) => obj.ContactID.toString() === id.toString())      
    }}
	
}
import {JetView, plugins} from "webix-jet";


export default class TopView extends JetView {
	config() {
		let header = {
			type: "header",
			localId: "header",
			template: "<div class='header'>#value#</div>",
			css: "webix_header app_header"
		};

		let menu = {
			view: "menu",
			id: "top:menu",
			css: "app_menu",
			width: 180,
			layout: "y",
			select: true,
			template: "<span class='webix_icon #icon#'></span> #value# ",
			data: [
				{value: "Contacts", id: "contacts", icon: "wxi-user"},
				{value: "Activities", id: "activities", icon: "wxi-calendar"},
				{value: "Settings", id: "settings", icon: "mdi mdi-cog-outline"}
			]
		};

		let ui = {
			type: "line",
			paddingX: 5,
			css: "app_layout",
			rows: [header,
				{cols: [
					{rows: [{css: "webix_shadow_medium", rows: [menu]}]},
					{type: "wide",
						rows: [
							{$subview: true}
						]}
				]}
			]

		};

		return ui;
	}

	init() {
		this.use(plugins.Menu, "top:menu");
		this.$$("header").bind(webix.$$("top:menu"));
	}
}


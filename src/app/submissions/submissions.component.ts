import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../services/employees.service';
import Highcharts, { Pointer } from "highcharts/highmaps";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";
import proj4 from "proj4";
import * as XLSX from 'xlsx';
import {
	faFileExport
} from '@fortawesome/free-solid-svg-icons';



@Component({
	selector: 'app-submissions',
	templateUrl: './submissions.component.html',
	styleUrls: ['./submissions.component.css']
})
export class SubmissionsComponent implements OnInit {


	names = []
	title = 'export-excel';
	fileName = 'ExportExcelList.xlsx';
	myData: any = []
	newWorldMapData: any = []
	Highcharts: typeof Highcharts = Highcharts;
	chartConstructor = "mapChart";
	chartOptions: any
	chartFlag: boolean = false
	faFileExport = faFileExport
	state = false;
	// date:any

	constructor(private employeeService: EmployeesService) {

	}

	// columnDefs: any = [
	// 	{ field: '_id', hide: true },
	// 	{ field: 'name', sortable: true, filter: true, width: 300 },
	// 	{ field: 'email', sortable: true, filter: true, width: 300 },
	// 	{ field: 'gender', sortable: true, filter: true, width: 300 },
	// 	{ field: 'status', sortable: true, filter: true, width: 300 },
	// ]

	columnDefs: any = [
		{ field: 'Task', sortable: true, filter: true, width: 200, resizable: true },
		{ field: 'Status', sortable: true, filter: true, width: 200, resizable: true },
		{ field: 'From', sortable: true, filter: true, width: 200, resizable: true },
		{ field: 'To', sortable: true, filter: true, width: 200, resizable: true },
		{ field: 'Customer_Address', sortable: true, filter: true, width: 200, resizable: true },
		{ field: 'Latitude', sortable: true, filter: true, width: 200, resizable: true },
		{ field: 'Longitude', sortable: true, filter: true, width: 200, resizable: true },
		{ field: 'Due_Date', sortable: true, filter: true, width: 200, resizable: true },
	]

	rowData = [{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Margao", Latitude: 11.1945753, Longitude: 70.0887576, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Inactive", From: "apoorvakini03@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Dhavali Ponda Goa", Latitude: 15.1945753, Longitude: 74.0887576, Due_Date: "25-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Vancouver", Latitude: 49.246292, Longitude: -123.116226, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Borim", Latitude: 14.1945753, Longitude: 77.0887576, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Tisk", Latitude: 16.1945753, Longitude: 74.0887576, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Shiroda", Latitude: 13.1945753, Longitude: 74.0887576, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Dhavali Ponda Goa", Latitude: 15.1945753, Longitude: 74.0887576, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Dhavali Ponda Goa", Latitude: 15.1945753, Longitude: 74.0887576, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Wisconsin, USA", Latitude: 44.500000, Longitude: -89.500000, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Louisiana, USA", Latitude: 30.391830, Longitude: -92.329102, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Dhavali Ponda Goa", Latitude: 15.1945753, Longitude: 74.0887576, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Dhavali Ponda Goa", Latitude: 15.1945753, Longitude: 74.0887576, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Dhavali Ponda Goa", Latitude: 15.1945753, Longitude: 74.0887576, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Dhavali Ponda Goa", Latitude: 15.1945753, Longitude: 74.0887576, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Dhavali Ponda Goa", Latitude: 15.1945753, Longitude: 74.0887576, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Dhavali Ponda Goa", Latitude: 15.1945753, Longitude: 74.0887576, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Dhavali Ponda Goa", Latitude: 15.1945753, Longitude: 74.0887576, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Dhavali Ponda Goa", Latitude: 15.1945753, Longitude: 74.0887576, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Dhavali Ponda Goa", Latitude: 15.1945753, Longitude: 74.0887576, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Dhavali Ponda Goa", Latitude: 15.1945753, Longitude: 74.0887576, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Dhavali Ponda Goa", Latitude: 15.1945753, Longitude: 74.0887576, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Dhavali Ponda Goa", Latitude: 15.1945753, Longitude: 74.0887576, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Dhavali Ponda Goa", Latitude: 15.1945753, Longitude: 74.0887576, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Dhavali Ponda Goa", Latitude: 15.1945753, Longitude: 74.0887576, Due_Date: "21-12-2023" },
	{ Task: "WorkFlow:Requires location", Status: "Active", From: "shashankkamath98@gmail.com", To: "zenduIt@gmail.com", Customer_Address: "Dhavali Ponda Goa", Latitude: 15.1945753, Longitude: 74.0887576, Due_Date: "21-12-2023" }]


	ngOnInit(): void {
		// this.employeeService.getAllEmployees().subscribe(res => {
		// 	this.rowData = res
		// 	console.log("Rowdata", this.rowData)


		this.rowData.forEach(ele => {
			this.newWorldMapData.push(
				{
					//plantName:allData[i].plantname,
					name: ele.Customer_Address,
					lat: ele.Latitude,
					lon: ele.Longitude,
				}

			)

		})
		this.myData.push(
			{
				type: "map",
				name: "Active countries",
				states: {
					hover: {
						color: "#BADA55"
					}
				},
				dataLabels: {
					enabled: true,
					format: "{point.name}"
				},
				allAreas: true,
			}, {
			type: 'mappoint',
			name: "Active users",
			marker: {
				radius: 5,
				fillColor: '#F68D5D',
			},
			data: this.newWorldMapData
		}
		)
		this.mychart()
	}

	mychart() {
		let chart: Highcharts.Options = {
			chart: {
				map: worldMap,
				proj4: proj4,
				style: {
					fontFamily: 'Lato Bold'
				}
			},
			title: {
				text: "Users logged In Info"
			},
			legend: {
				enabled: true
			},
			// colorAxis: {
			// 	min: 0
			// },
			subtitle: {
				text:
					'Selected cities were marked using their lat/lon coordinates'
			},
			tooltip: {
				style: {
					color: '#FFFFFF',
					fontSize: "14px"
				},
				backgroundColor: '#626262',
				borderColor: '#626262',
			},
			mapNavigation: {
				enabled: true,
				buttonOptions: {
					// verticalAlign: "bottom"
					alignTo: "spacingBox"
				}
			},
			credits: {
				enabled: true
			},
			series: this.myData,
		};
		console.log("infunc", this.myData)
		this.chartOptions = chart
		this.chartFlag = true

	}

	gridApiActive: any
	onGridReady1(params: any) {
		this.gridApiActive = params.api
		// this.employeeService.getAllEmployees().subscribe(res => {
		// 	this.rowData = res
		// })
	}

	searchText: any
	onFilterBoxChanged() {
		this.gridApiActive.setQuickFilter(this.searchText)
	}

	exportexcel(): void {
		const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowData);
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
		XLSX.writeFile(wb, this.fileName);
	}


	parseDate(e:any){
		console.log(e)
		console.log(new Date(Date.parse(e)), 'DD-MM-YYYY')

	}

	maplist() {

		this.state = !this.state;
		console.log("State", this.state)
	}




}




import { BillInterface } from "../bill/IBill";
export interface ReceiveInterface {
  ID: number,
  Employee_ID: number,
  //Employee:         EmployeeInterface,
  Bill_ID : number,
  Bill : BillInterface,
  Det_ID : number,
  //Det : StockInerface,
  Det_Quantity : number,
  Sof_ID : number,
  //Sof : StockInerface,
  Sof_Quantity : number,
  Time_Stamp:   Date,

}
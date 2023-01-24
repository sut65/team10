import { BillInterface } from "../bill/IBill";
import { StocksInterface } from "../Stock/IStock";
import { EmployeesInterface } from "../Employee/IEmployee";
export interface ReceiveInterface {
  ID: number,

  Employee_ID: number,
  Employee:         EmployeesInterface,
  
  Bill_ID : number,
  Bill : BillInterface,

  Det_ID : number,
  Det : StocksInterface,
  Det_Quantity : number,

  Sof_ID : number,
  Sof : StocksInterface,
  Sof_Quantity : number,

  Time_Stamp:   Date,

}
import { BillInterface } from "../bill/IBill";
import { EmployeesInterface } from "../Employee/IEmployee";
import { DetergentInterface } from "./IDetergent";
import { SoftenerInterface } from "./ISoftener";
import { StocksInterface } from "../Stock/IStock";
export interface ReceiveInterface {
  ID: number,

  Employee_ID: number,
  Employee:         EmployeesInterface,
  
  Bill_ID : number,
  Bill : BillInterface,

  Detergent_ID : number,
  Detergent : StocksInterface,
  Det_Quantity : number,

  Softener_ID : number,
  Softener : StocksInterface,
  Sof_Quantity : number,

  Time_Stamp:   Date,

}
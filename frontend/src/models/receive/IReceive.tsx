import { BillInterface } from "../bill/IBill";
import { EmployeesInterface } from "../Employee/IEmployee";
import { DetergentInterface } from "./IDetergent";
import { SoftenerInterface } from "./ISoftener";
export interface ReceiveInterface {
  ID: number,

  Employee_ID: number,
  Employee:         EmployeesInterface,
  
  Bill_ID : number,
  Bill : BillInterface,

  Detergent_ID : number,
  Detergent : DetergentInterface,
  Det_Quantity : number,

  Softener_ID : number,
  Softener : SoftenerInterface,
  Sof_Quantity : number,

  Time_Stamp:   Date,

}
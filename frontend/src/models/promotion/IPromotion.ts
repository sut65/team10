import { ReasonInterface } from "./IReason";
import { CodetypeInterface } from "./ICodetype";
import { EmployeesInterface } from "../Employee/IEmployee";
export interface PromotionInterface {

  ID: number,

  Codetype_ID: number,
  Codetype: CodetypeInterface,

  Reason_ID: number,
  Reason: ReasonInterface,

  Price: number,
  Amount: number,

  Employee_ID: number,
  Employee:         EmployeesInterface,
  Time_Stamp: Date,
}
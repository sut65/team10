import { ReasonInterface } from "./IReason";
import { CodetypeInterface } from "./ICodetype";
import { EmployeeInterface } from "../employee/IEmployee";
export interface PromotionInterface {

  ID: number,

  Codetype_ID: number,
  Codetype: CodetypeInterface,

  Reason_ID: number,
  Reason: ReasonInterface,

  Price: number,
  Amount: number,

  Employee_ID: number,
  Employee:         EmployeeInterface,
  Time_Stamp: Date,
}
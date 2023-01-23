import { ReasonInterface } from "./IReason";
import { CodetypeInterface } from "./ICodetype";
export interface PromotionInterface {

    ID:         number,

    Codetype_ID:       number,
    Codetype:         CodetypeInterface,

    Re_ID: number,
    Reason:         ReasonInterface,

    Price: number,
    Amount: number,
    
    Employee_ID: number,
    //Employee:         EmployeeInterface,
    Time_Stamp: Date,
  }
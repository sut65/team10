import { BrandInterface } from "./Brand";
import { EngineInterface } from "./Engine";
export interface ReceiveInterface {
  ID: number,
  Employee_ID: number,
  //Employee:         EmployeeInterface,
  Brand_ID :   number,
  Brand :  BrandInterface,
  Engine_ID : number,
  Engine : EngineInterface,
  ListModel : string,
  Registeration:  number,
  Time_Stamp:   Date,

}
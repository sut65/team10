import { BrandVehicleInterface } from "./IBrandVehicle";
import { EngineInterface } from "./IEngine";
import { EmployeesInterface } from "../Employee/IEmployee";

export interface VehicleInterface {
    ID: number,

    Employee_ID: number,
    Employee:         EmployeesInterface,

    Brand_Vehicle_ID : number,
    Brand_Vehicle: BrandVehicleInterface,

    Engine_ID : number,
    Engine : EngineInterface,

    ListModel : string,
    Registration:  string,
    
    Date_Insulance:   Date,
  
  }
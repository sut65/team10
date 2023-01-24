import { BrandVehicleInterface } from "./IBrandVehicle";
import { EngineInterface } from "./IEngine";
import { EmployeesInterface } from "../Employee/IEmployee";

export interface VehicleInterface {
    ID: number,

    Employee_ID: number,
    Employee:         EmployeesInterface,

    Brand_ID : number,
    Brand: BrandVehicleInterface,

    Engine_ID : number,
    Engine : EngineInterface,

    ListModel : string,
    Registration:  number,
    
    Date_Insurance:   Date,
  
  }
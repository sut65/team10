import { BrandVehicleInterface } from "./IBrandVehicle";
import { EngineInterface } from "./IEngine";
import { EmployeesInterface } from "../Employee/IEmployee";

export interface VehicleInterface {
    ID: number,

    Employee_ID: number,
    Employee:         EmployeesInterface,

    Brand_Vehicle_ID : number,
    BrandVehicle: BrandVehicleInterface,

    Engine_ID : number,
    Engine : EngineInterface,

    ListModel : string,
    Vehicle_Regis:  number,
    
    Date_Insurance:   Date,
  
  }
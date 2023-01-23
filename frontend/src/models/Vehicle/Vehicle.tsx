import { BrandInterface } from "./BrandVehicle";
import { EngineInterface } from "./Engine";

export interface VehicleInterface {
    ID: number,
    Employee_ID: number,
    //Employee:         EmployeeInterface,
    Brand_ID : number,
    Brand: BrandInterface,
    Engine_ID : number,
    Engine : EngineInterface,
    ListModel : string,
    Registeration:  number,
    Date_Insurance:   Date,
  
  }
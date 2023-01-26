import { EmployeesInterface } from "../Employee/IEmployee";
import { PackagingInterface } from "./IPackagink";
import { ReceiveInterface } from "../receive/IReceive";

export interface CompleteInterface {

    ID: number,
    Complete_datetime: Date;

    Employee_ID: number;
    Name:   String;
    Employee: EmployeesInterface

    Packaging_ID: number;
    Packaging_Type: string;
    Packaging: PackagingInterface

    Receive_ID: number;
    Receive:  ReceiveInterface
   
   }
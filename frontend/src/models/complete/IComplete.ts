import { EmployeesInterface } from "../Employee/IEmployee";
import { PackagingInterface } from "./IPackagink";
import { ReceiveInterface } from "../receive/IReceive";

export interface ComplertInterface {

    Complete_ID: string,
    Complete_datetime: Date;

    Employee_ID: string;
    Employee: EmployeesInterface

    Packaging_ID: string;
    Packaging: PackagingInterface

    Receive_ID: string;
    Receive:  ReceiveInterface
   
   }
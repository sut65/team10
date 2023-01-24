import { TypesInterface } from "./IType";
import { EmployeesInterface } from "../Employee/IEmployee";
import { SizesInterface } from "./ISize";
import { BrandInterface } from "../vehicle/IBrandVehicle";

export interface StocksInterface {
    [x: string]: any;
    ID: number,

    List_Number:    number,

    TypeID:     number,
    Type:       TypesInterface,

	BrandID:       number,

	Brand:			BrandInterface,

    SizeID:       number,

	Size:			SizesInterface,

    EmployeeID:     number,
    Employee:       EmployeesInterface,
	
	Add_number:     number,
    Quantity:       number,
    Time:            Date,
  }
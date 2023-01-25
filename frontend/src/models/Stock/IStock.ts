import { TypesInterface } from "./IType";
import { EmployeesInterface } from "../Employee/IEmployee";
import { SizesInterface } from "./ISize";
import { BrandsInterface } from "./IBrand";
export interface StocksInterface {
    [x: string]: any;
    ID: number,

    List_Number:    number,

    TypeID:     number,
    Type:       TypesInterface,

	BrandID:       number,

	Brand:			BrandsInterface,

    SizeID:       number,

	Size:			SizesInterface,

    EmployeeID:     number,
    Employee:       EmployeesInterface,
	
	Add_number:     number,
    Quantity:       number,
    Time:            Date,
  }
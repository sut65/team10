import { TypesInterface } from "./IType";
import { EmployeesInterface } from "../Employee/IEmployee";
import { SizesInterface } from "./ISize";
import { BrandsInterface } from "./IBrand";
export interface StocksInterface {
    [x: string]: any;
    ID: number,

    List_Number:    string,

    TypeID:     number,
    Type:       TypesInterface,

	BrandID:       number,

	Brand:			BrandsInterface,

    SizeID:       number,

	Size:			SizesInterface,

    Employee_ID:     number,
    Employee:       EmployeesInterface,
	
    Quantity:       number,
    Time:            Date,
  }
import { WorkShiftsInterface } from "../Employee/IWorkShift";
import { GendersInterface } from "../Employee/IGender";
import { PositionsInterface } from "../Employee/IPosition";

export interface EmployeesInterface {
  ID: number;
  Personal_ID: string;
  Username: string;
  Name: string;
  Gender_ID: number;
  Gender: GendersInterface;
  Position_ID: number;
  Position: PositionsInterface;
  WorkShift_ID: number;
  WorkShift: WorkShiftsInterface;
  Phonnumber: string;
  Address: string;
  Password: string;
}

import { ConfirmationInterface } from "../confirmation/IConfirmation";
import { EmployeesInterface } from "../Employee/IEmployee";
import { VehicleInterface } from "../vehicle/IVehicle";

export interface DeliveryInterface {
  ID: number;
  Employee_ID: number;
  Employee: EmployeesInterface;
  Confirmation_ID: number;
  Confirmation: ConfirmationInterface;
  Vehicle_ID: number;
  Vehicle: VehicleInterface;
  Score: number;
  Problem: string;
}

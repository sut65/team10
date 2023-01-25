
import { WorkShiftsInterface } from "../Employee/IWorkShift";
import { GendersInterface } from "../Employee/IGender";
import { PositionsInterface } from "../Employee/IPosition";

export interface EmployeesInterface {
    [x: string]: any;
    ID: number,

    Personal_ID:    string,

    Userame:     string,

	Name:      string,

	GenderID:       number,

	Gender:			GendersInterface,

    WorkShiftID:       number,

	WorkShift:			WorkShiftsInterface,


	PositionID:     number,

	Position:		PositionsInterface,
	
	Password:       string,
  }
  
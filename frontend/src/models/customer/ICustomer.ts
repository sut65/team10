import { CareerInterface } from "./ICareer";
import { AdvertiseInterface } from "./IAdvertise";
import { GendersInterface } from "../Employee/IGender";

export interface CustomerInterface {
    ID:                 number,
    Customer_Name:                string ,
    Customer_Username:            string ,
    Customer_Phone:               string ,
    Customer_Promptpay:          string ,
    Customer_Password:           string ,
    Customer_Address:            string ,
 
    Career_ID:  number;
    Career: CareerInterface

    Advertise_ID: number;
    Advertise: AdvertiseInterface

    Gender_ID: number;
    Gender_Name:   string;
    Gerder: GendersInterface


   }

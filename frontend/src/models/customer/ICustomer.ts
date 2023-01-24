import { CareerInterface } from "./ICareer";
import { AdvertiseInterface } from "./IAdvertise";
import { GendersInterface } from "../Employee/IGender";

export interface CustomerInterface {
    Customer_ID:                 string,
    Customer_Name:                string ,
    Customer_Username:            string ,
    Customer_Phone:               string ,
    Customer_Promptpay:          string ,
    Customer_Password:           string ,
    Customer_Address:            string ,
 
    Career_ID:  string;
    Career: CareerInterface

    Advertise_ID: string;
    Advertise: AdvertiseInterface

    Gender_ID: string;
    Gerder: GendersInterface

   }

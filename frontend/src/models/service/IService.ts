import { CustomerInterface } from "../customer/ICustomer";

export interface ServiceInterface {
    ID: number,
    Address: string;
    Price:  number;
   
    Weight_ID: number;
    Weight_price: number;
    Weight: WeightInterface
   
    TypeWashing_ID: number;
    Type_washing: string;
    TypeWashing_price: number;
    Description: string;
    TypeWashing:TypeWashingInterface
   
    DeliveryType_ID: number;
    DeliveryType_price: number;
    DeliveryType_service: string;
    DevileryType:DeliveryTypeInterface

    Customer_ID: number;
    Customer:CustomerInterface;

    sumprice: number;
   
}

export interface DeliveryTypeInterface {
    ID: number,
   
    DeliveryType_service: string;
   
    DeliveryType_price: number;
   
}

export interface TypeWashingInterface {
    ID: number,
   
    Type_washing: string;
   
    Description: string;
    TypeWashing_price: number;
   }


export interface WeightInterface {
    ID: number,
   
    Weight_net: string;
   
    Weight_price: number;
   
   }

export interface SumpriceInterface {
    sumprice: number;
}
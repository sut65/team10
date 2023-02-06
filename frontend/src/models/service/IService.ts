import { CustomerInterface } from "../customer/ICustomer";

export interface ServiceInterface {
    ID: number,
    Address: string;
    Bill_Price: number;

    Weight_ID: number;
    Weight_net: string;
    Weight_price: number;
    Weight: WeightInterface

    TypeWashing_ID: number;
    Type_washing: string;
    TypeWashing_price: number;
    Description: string;
    TypeWashing: TypeWashingInterface

    DeliveryType_ID: number;
    DeliveryType_price: number;
    DeliveryType_service: string;
    DeliveryType: DeliveryTypeInterface

    Bill_status: number;
    Customer_ID: number;
    Customer: CustomerInterface;

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
    TypeWashing_Price: number;
}


export interface WeightInterface {
    ID: number,

    Weight_net: string;

    Weight_price: number;

}
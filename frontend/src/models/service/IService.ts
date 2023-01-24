export interface ServiceInterface {
    ID: number,
    Address: string;
   
    Weight_ID: number;
    Weight: WeightInterface
   
    TypeWashing_ID: number;
    Type_washing: string;
    TypeWashing:TypeWashingInterface
   
    Delivery_ID: number;
    Devilery:DeliveryInterface
   
}

export interface DeliveryInterface {
    ID: number,
   
    Derivery_service: string;
   
    Delivery_price: number;
   
}

export interface TypeWashingInterface {
    ID: number,
   
    Type_washing: string;
   
    Description: string;
   
   }


export interface WeightInterface {
    ID: number,
   
    Weight_net: string;
   
    Weight_price: number;
   
   }
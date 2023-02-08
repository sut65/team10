import { CustomerInterface } from "../customer/ICustomer"

export interface FormInterface {
    ID: number,
    Comment: string,

    SatisfactionID: number,
    Satisfaction_name: string,
    Satisfaction: SatisfactionInterface

    FormTypeID: number,
    FormType_name: string,
    FormType: FormTypeInterface

    CustomerID: number,
    Customer: CustomerInterface
}

export interface SatisfactionInterface {
    ID: number,
    Satisfaction_name: string,
}

export interface FormTypeInterface {
    ID: number,
    FormType_name: string,
}

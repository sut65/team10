export interface FormInterface {
    ID: number,
    Comment: string,

    SatisfactionID: number,
    Satisfaction: SatisfactionInterface

    FormTypeID: number,
    FormType_name: string,
    FormType: FormTypeInterface

}

export interface SatisfactionInterface {
    ID: number,
    Satisfaction_name: string,
}

export interface FormTypeInterface {
    ID: number,
    FormType_name: string,
}

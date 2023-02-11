import { PaymenttypeInterface } from "./IPaymenttype";
import { QuotaCodeInterface } from "../promotion/IQuotaCode";
import { ServiceInterface } from "../service/IService";
export interface BillInterface {
  ID: number,
  Service_ID: number,
  Service:         ServiceInterface,
  QuotaCode_ID: number,
  QuotaCode:    QuotaCodeInterface,
  Paymenttype_ID:   number,
  Paymenttype:  PaymenttypeInterface,
  Bill_Price:   number,
  Receive_State:  number,
  Time_Stamp:   Date,

}
import { PaymenttypeInterface } from "./IPaymenttype";
import { QuotaCodeInterface } from "../promotion/IQuotaCode";
import { ServiceInterface } from "../service/IService";
export interface BillInterface {
  ID: number,
  Service_ID: number,
  Service:         ServiceInterface,
  Q_ID: number,
  QuotaCode:    QuotaCodeInterface,
  Paymenttype_ID:   number,
  Paymenttype:  PaymenttypeInterface,
  Bill_Price:   number,
  Time_Stamp:   Date,

}
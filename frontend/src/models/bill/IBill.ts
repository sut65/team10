import { PaymenttypeInterface } from "./IPaymenttype";
import { QuotaCodeInterface } from "../promotion/IQuotaCode";
export interface BillInterface {
  ID: number,
  Customer_ID: number,
  //Customer:         CustomerInterface,
  Q_ID: number,
  QuotaCode:    QuotaCodeInterface,
  Paymenttype_ID:   number,
  Paymenttype:  PaymenttypeInterface,
  Bill_Price:   number,
  Time_Stamp:   Date,

}
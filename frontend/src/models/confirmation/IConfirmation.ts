import { CompleteInterface } from "../complete/IComplete";
import { CustomerInterface } from "../customer/ICustomer";
import { RecvTypeInterface } from "./IRecvType";

export interface ConfirmationInterface {
  ID: number;
  Complete_ID: number;
  Complete: CompleteInterface
  Customer_ID: number;
  Customer: CustomerInterface;
  RecvTime: Date;
  DeliveryInstruction: string;
  RecvType_ID: number;
  RecvType: RecvTypeInterface;
  Note: string;
}

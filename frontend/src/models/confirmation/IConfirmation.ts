import { RecvTypeInterface } from "./IRecvType";

export interface ConfirmationInterface {
  ID: number;
  Complete_ID: number;
  Customer_ID: number;
  //Customer: CustomerInterface;
  RecvTime: Date;
  RecvAddress: string;
  RecvType_ID: number;
  RecvType: RecvTypeInterface;
  Note: string;
}

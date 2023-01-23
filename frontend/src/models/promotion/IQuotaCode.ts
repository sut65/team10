import { PromotionInterface } from "./IPromotion";
import { BillInterface } from "../bill/IBill";
export interface QuotaCodeInterface {

    ID:         number,

    Promotion_ID:       number,
    Promotion:         PromotionInterface,
    
    Bill_FK: number,
    Bill:         BillInterface,
  }
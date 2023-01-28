package entity

import (
	"time"

	"gorm.io/gorm"
)

/* -------------------------------------------------------------------------- */
/*                               Register System                              */
/* -------------------------------------------------------------------------- */
//Cutomer

type Advertise struct {
	gorm.Model
	Advertise_Type string
	Customer       []Customer `gorm:"foreingnKey:Advertise_ID"`
}

type Career struct {
	gorm.Model
	Career_Name string
	Customer    []Customer `gorm:"foreingnKey:Career_ID"`
}

type Customer struct {
	gorm.Model
	Customer_Name      string `gorm:"uniqueIndex"`
	Customer_Username  string `gorm:"uniqueIndex"`
	Customer_Phone     string
	Customer_Promptpay string
	Customer_Password  string
	Customer_Address   string

	Gender_ID *uint
	Gender    Gender

	Advertise_ID *uint
	Advertise    Advertise

	Career_ID *uint
	Career    Career

	Confirmation []Confirmation `gorm:"foreignKey:Customer_ID"`
	Service              []Service `gorm:"foreignKey:Customer_ID"`
	Form              []Form `gorm:"foreignKey:Customer_ID"`
}

/* -------------------------------------------------------------------------- */
/*                             Employee Management                            */
/* -------------------------------------------------------------------------- */
type Gender struct {
	gorm.Model
	Gender_Name string
	Employee    []Employee `gorm:"foreignKey:Gender_ID"`
	Customer    []Customer `gorm:"foreingnKey:Gender_ID"`
}
type Position struct {
	gorm.Model
	Position_Name string
	Employee      []Employee `gorm:"foreignKey:Position_ID"`
}
type WorkShift struct {
	gorm.Model
	Work_shift_Name string
	Employee        []Employee `gorm:"foreignKey:WorkShift_ID"`
}

type Employee struct {
	gorm.Model
	Personal_ID  string `gorm:"uniqueIndex"`
	Username     string `gorm:"uniqueIndex"`
	Name         string
	Gender_ID    *uint
	Gender       Gender `gorm:"references:id"`
	Position_ID  *uint
	Position     Position `gorm:"references:id"`
	WorkShift_ID *uint
	WorkShift    WorkShift `gorm:"references:id"`
	Phonnumber   string
	Address      string
	Password     string
	Stock        []Stock     `gorm:"foreignKey:Employee_ID"`
	Vehicle      []Vehicle   `gorm:"foreignKey:Employee_ID"`
	Receive      []Receive   `gorm:"foreignKey:Employee_ID"`
	Promotion    []Promotion `gorm:"foreignKey:Employee_ID"`
	Delivery     []Delivery  `gorm:"foreignKey:Employee_ID"`
	Complete     []Complete  `gorm:"foreignKey:Employee_ID"`
}

/* -------------------------------------------------------------------------- */
/*                                    Stock                                   */
/* -------------------------------------------------------------------------- */
type Type struct {
	gorm.Model
	Type_Name string
	Stock     []Stock `gorm:"foreignKey:TypeID"`
	Brand     []Brand `gorm:"foreignKey:TypeID"`
}
type Brand struct {
	gorm.Model
	Band_Name string
	TypeID    *uint
	Type      Type    `gorm:"references:id"`
	Stock     []Stock `gorm:"foreignKey:BrandID"`
}
type Size struct {
	gorm.Model
	Size_Name string
	Stock     []Stock `gorm:"foreignKey:SizeID"`
}

type Stock struct {
	gorm.Model
	List_Number string `gorm:"uniqueIndex"`
	TypeID      *uint
	Type        Type `gorm:"references:id"`
	BrandID     *uint
	Brand       Brand `gorm:"references:id"`
	SizeID      *uint
	Size        Size `gorm:"references:id"`
	Employee_ID *uint
	Employee    Employee `gorm:"references:id"`
	Add_number  string
	Quantity    string
	Time        time.Time
	Detergent   []Detergent `gorm:"foreignKey:Stock_ID"`
	Softener    []Softener  `gorm:"foreignKey:Stock_ID"`
}

//end
/* -------------------------------------------------------------------------- */
/*                                   Service                                  */
/* -------------------------------------------------------------------------- */

type TypeWashing struct {
	gorm.Model
	Type_washing string
	TypeWashing_Price uint
	Description  string
	Service      []Service `gorm:"foreignKey:TypeWashing_ID"`
}

type DeliveryType struct {
	gorm.Model
	DeriveryType_service string
	DeliveryType_price   uint8
	Service              []Service `gorm:"foreignKey:DeliveryType_ID"`
}

type Weight struct {
	gorm.Model
	Weight_net   string
	Weight_price uint8
	Service      []Service `gorm:"foreignKey:Weight_ID"`
}

type Service struct {
	gorm.Model
	TypeWashing_ID *uint
	TypeWashing    TypeWashing `gorm:"references:id"`

	DeliveryType_ID *uint
	DeliveryType    DeliveryType `gorm:"references:id"`

	Weight_ID *uint
	Weight    Weight `gorm:"references:id"`

	Customer_ID *uint
	Customer    Customer `gorm:"references:id"`

	Address string
	Bill_Price	uint
	Bill    []Bill `gorm:"foreignKey:Service_ID"`
}

/* -------------------------------------------------------------------------- */
/*                                  Form                                      */
/* -------------------------------------------------------------------------- */

type Satisfaction struct {
	gorm.Model
	Satisfaction_name string
	Form              []Form `gorm:"foreignKey:SatisfactionID"`
}

type FormType struct {
	gorm.Model
	FormType_name string
	Form          []Form `gorm:"foreignKey:FormTypeID"`
}

type Form struct {
	gorm.Model
	Comment string

	SatisfactionID *uint
	Satisfaction   Satisfaction `gorm:"references:id"`

	FormTypeID *uint
	FormType   FormType `gorm:"references:id"`

	Customer_ID *uint
	Customer    Customer `gorm:"references:id"`
}

/* -------------------------------------------------------------------------- */
/*                                    Bill                                    */
/* -------------------------------------------------------------------------- */
// ระบบจัดการบิลชำระค่าบริการ
type Paymenttype struct {
	gorm.Model
	Type string
	Bill []Bill `gorm:"foreignKey:Paymenttype_ID"`
}

type Bill struct {
	gorm.Model
	Service_ID     *uint
	Service        Service `gorm:"references:id"`
	QuotaCode_ID   *uint
	QuotaCode      *QuotaCode `gorm:"references:id"`
	Paymenttype_ID *uint
	Paymenttype    Paymenttype `gorm:"references:id"`
	Bill_Price     uint
	Time_Stamp     time.Time
	QuotaCode_FK   []QuotaCode `gorm:"foreignKey:Bill_ID"`
	Receive        []Receive   `gorm:"foreignKey:Bill_ID"`
}

/* -------------------------------------------------------------------------- */
/*                                  Promotion                                 */
/* -------------------------------------------------------------------------- */
// ระบบจัดการโปรโมชั่น
type Codetype struct {
	gorm.Model
	Type      string
	Promotion []Promotion `gorm:"foreignKey:Codetype_ID"`
}

type Reason struct {
	gorm.Model
	Reason    string
	Promotion []Promotion `gorm:"foreignKey:Reason_ID"`
}

type Promotion struct {
	gorm.Model
	Codetype_ID *uint
	Codetype    Codetype `gorm:"references:id"`
	Reason_ID   *uint
	Reason      Reason `gorm:"references:id"`
	Price       uint
	Amount      uint
	Employee_ID *uint
	Employee    Employee `gorm:"references:id"`
	Time_Stamp  time.Time
	QuotaCode   []QuotaCode `gorm:"foreignKey:Promotion_ID"`
}

type QuotaCode struct {
	gorm.Model
	Promotion_ID *uint
	Promotion    Promotion `gorm:"references:id"`
	Bill_ID      *uint
	Bill         *Bill  `gorm:"references:id"`
	Bill_FK      []Bill `gorm:"foreignKey:QuotaCode_ID"`
}

/* -------------------------------------------------------------------------- */
/*                                   Receive                                  */
/* -------------------------------------------------------------------------- */
//ระบบรับรายการผ้า
type Detergent struct {
	gorm.Model
	Stock_ID *uint
	Stock    Stock     `gorm:"references:id"`
	Receive  []Receive `gorm:"foreignKey:Detergent_ID"`
}
type Softener struct {
	gorm.Model
	Stock_ID *uint
	Stock    Stock     `gorm:"references:id"`
	Receive  []Receive `gorm:"foreignKey:Softener_ID"`
}
type Receive struct {
	gorm.Model
	Employee_ID  *uint
	Employee     Employee `gorm:"references:id"`
	Bill_ID      *uint
	Bill         Bill `gorm:"references:id"`
	Detergent_ID *uint
	Detergent    Detergent `gorm:"references:id"`
	Softener_ID  *uint
	Softener     Softener `gorm:"references:id"`
	Det_Quantity uint
	Sof_Quantity uint
	Time_Stamp   time.Time

	Complete []Complete `gorm:"foreignKey:Receive_ID"`
}

/* -------------------------------------------------------------------------- */
/*                                  Vehicle                                   */
/* -------------------------------------------------------------------------- */
//ระบบจัดการรถขนส่ง
type Brand_Vehicle struct {
	gorm.Model
	Brand_Vehicle string
	Vehicle       []Vehicle `gorm:"foreignKey:Brand_Vehicle_ID"`
}

type Engine struct {
	gorm.Model
	Engine  string
	Vehicle []Vehicle `gorm:"foreignKey:Engine_ID"`
}
type Vehicle struct {
	gorm.Model
	Employee_ID      *uint
	Employee         Employee `gorm:"references:id"`
	Brand_Vehicle_ID *uint
	Brand_Vehicle    Brand_Vehicle `gorm:"references:id"`
	Engine_ID        *uint
	Engine           Engine `gorm:"references:id"`
	ListModel        string
	Vehicle_Rigis    string
	Time_Insulance   time.Time
	Delivery         []Delivery `gorm:"foreignKey:Vehicle_ID"`
}

/* -------------------------------------------------------------------------- */
/*                           Complete (ผ้ารีบพับแพ๊ค)                            */
/* -------------------------------------------------------------------------- */

type Packaging struct {
	gorm.Model
	Packaging_Type string
	Complete       []Complete `gorm:"foreingnKey:Packaging_ID"`
}

type Complete struct {
	gorm.Model
	Complete_datetime time.Time

	Employee_ID *uint
	Employee    Employee `gorm:"references:id"`

	Receive_ID *uint
	Receive    Receive `gorm:"references:id"`

	Packaging_ID *uint
	Packaging    Packaging `gorm:"references:id"`

	Confirmation []Confirmation `gorm:"foreignKey:Complete_ID"`
}

/* -------------------------------------------------------------------------- */
/*                                Confirmation                                */
/* -------------------------------------------------------------------------- */
type Confirmation struct {
	gorm.Model
	Complete_ID *uint
	Complete    Complete `gorm:"references:id"`
	Customer_ID *uint
	Customer    Customer `gorm:"references:id"`
	RecvTime    time.Time
	RecvAddress string
	RecvType_ID *uint
	RecvType    RecvType `gorm:"references:id"`
	Note        string
	Delivery    []Delivery `gorm:"foreignKey:Confirmation_ID"`
}

type RecvType struct {
	gorm.Model
	Name         string
	Confirmation []Confirmation `gorm:"foreignKey:RecvType_ID"`
}

/* -------------------------------------------------------------------------- */
/*                                  Delivery                                  */
/* -------------------------------------------------------------------------- */
type Delivery struct {
	gorm.Model
	Employee_ID     *uint
	Employee        Employee `gorm:"references:id"`
	Confirmation_ID *uint
	Confirmation    Confirmation `gorm:"references:id"`
	Vehicle_ID      *uint
	Vehicle         Vehicle `gorm:"references:id"`
	Score           uint
	Problem         string
}

// type Test struct {
// 	gorm.Model
// 	Name string
// }

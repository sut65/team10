package entity

import (
	"time"

	"gorm.io/gorm"
)

/* -------------------------------------------------------------------------- */
/*                               Register System                              */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                             Employee Management                            */
type Gender struct {
	gorm.Model
	Gender_Name string
	Employee    []Employee `gorm:"foreignKey:Gender"`
}
type Position struct {
	gorm.Model
	Position_Name string
	Employee      []Employee `gorm:"foreignKey:Position"`
}
type WorkShift struct {
	gorm.Model
	Work_shift_Name string
	Employee        []Employee `gorm:"foreignKey:Work_shift"`
}

type Employee struct {
	gorm.Model
	Personal_ID *uint
	Username    string
	Name        string
	GenderID    *uint
	Gender      Gender `gorm:"references:id"`
	PositionID  *uint
	Position    Position `gorm:"references:id"`
	WorkShiftID *uint
	WorkShift   WorkShift   `gorm:"references:id"`
	Stock       []Stock     `gorm:"foreignKey:Employee"`
	Vehicle     []Vehicle   `gorm:"foreignKey:Employee"`
	Receive     []Receive   `gorm:"foreignKey:Employee"`
	Promotion   []Promotion `gorm:"foreignKey:Employee_ID"`
}

/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                     ระบบจัดการStork       */
/* -------------------------------------------------------------------------- */
type Type struct {
	gorm.Model
	Type_Name string
	Stock     []Stock `gorm:"foreignKey:Type"`
	Brand     []Brand `gorm:"foreignKey:Type"`
}
type Brand struct {
	gorm.Model
	Band_Name string
	TypeID    *uint
	Type      Type    `gorm:"references:id"`
	Stock     []Stock `gorm:"foreignKey:Band"`
}
type Size struct {
	gorm.Model
	Size_Name string
	Stock     []Stock `gorm:"foreignKey:Work_shift"`
}

type Stock struct {
	gorm.Model
	List_Number *uint
	TypeID      *uint
	Type        Type `gorm:"references:id"`
	BrandID     *uint
	Brand       Brand `gorm:"references:id"`
	SizeID      *uint
	Size        Size `gorm:"references:id"`
	PersonalID  *uint
	Employee    Employee `gorm:"references:id"`
	Add_Number  *uint
	Quantity    *uint
	Time        time.Time
	Det         []Receive `gorm:"foreignKey:Det_ID"`
	Sof         []Receive `gorm:"foreignKey:Sof_ID"`
}

/* -------------------------------------------------------------------------- */
/*                                   Service                                  */
/* -------------------------------------------------------------------------- */

type TypeWashing struct {
	gorm.Model 
	Type_washing     string 
	Description      string 
	Service []Service `gorm:"foreignKey:TypeWashing_ID"`
  }
  
  type Delivery struct {
	gorm.Model
	Derivery_service      string
	Delivery_price        uint8
	Service []Service `gorm:"foreignKey:Delivery_ID"`
  }
  
  type Weight struct {
	gorm.Model
	Weight_net     string
	Weight_price   uint8
	Service []Service `gorm:"foreignKey:Weight_ID"`
  }
  
  type Service struct {
	gorm.Model
	TypeWashing_ID  *uint
	TypeWashing     TypeWashing `gorm:"references:id"`
  
	Delivery_ID     *uint
	Delivery        Delivery  `gorm:"references:id"`
  
	Weight_ID       *uint
	Weight          Weight `gorm:"references:id"`
  
	Address      string
  }

/* -------------------------------------------------------------------------- */
/*                                   Review                                   */
/* -------------------------------------------------------------------------- */

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
	Customer_ID *uint
	//รอจาก customer
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
	Promotion []Promotion `gorm:"foreignKey:Re_ID"`
}

type Promotion struct {
	gorm.Model
	Codetype_ID *uint
	Codetype    Codetype `gorm:"references:id"`
	Re_ID       *uint
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
type Receive struct {
	gorm.Model
	Employee_ID  *uint
	Employee     Employee `gorm:"references:id"`
	Bill_ID      *uint
	Bill         *Bill `gorm:"references:id"`
	Det_ID       *uint
	Det          Stock `gorm:"references:id"`
	Sof_ID       *uint
	Sof          Stock `gorm:"references:id"`
	Det_quantity string
	Sof_quantity string
	Time_Stamp   time.Time
}

/* -------------------------------------------------------------------------- */
/*                                  Vehicle                                   */
/* -------------------------------------------------------------------------- */
//ระบบจัดการรถขนส่ง
type Brand_Vehicle struct {
	gorm.Model
	Brand   string
	Vehicle []Vehicle `gorm:"foreignKey:Brand_ID"`
}

type Engine struct {
	gorm.Model
	Engine  int
	Vehicle []Vehicle `gorm:"foreignKey:Engine_ID"`
}
type Vehicle struct {
	gorm.Model
	Employee_ID   *uint
	Employee      Employee `gorm:"references:id"`
	Brand_ID      *uint
	Brand         Brand_Vehicle `gorm:"references:id"`
	Engine_ID     *uint
	Engine        Engine `gorm:"references:id"`
	ListModel     string
	Registeration string
	Time_Stamp    time.Time
}

/* -------------------------------------------------------------------------- */
/*                           Complete (ผ้ารีบพับแพ๊ค)                            */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                Confirmation                                */
/* -------------------------------------------------------------------------- */
type Confirmation struct {
	gorm.Model
	Complete_ID *uint
	Customer_ID *uint
	//รอ Customer
	RecvTime    time.Time
	RecvAddress string
	RecvType_ID *uint
	RecvType    RecvType `gorm:"references:id"`
	Note        string
}

type RecvType struct {
	gorm.Model
	RecvType_Name string
	Confirmation  []Confirmation `gorm:"foreignKey:RecvType_ID"`
}

/* -------------------------------------------------------------------------- */
/*                                  Delivery                                  */
/* -------------------------------------------------------------------------- */

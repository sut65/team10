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
	WorkShift   WorkShift `gorm:"references:id"`
	Stock       []Stock   `gorm:"foreignKey:Employee"`
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
	EmployeeID  *uint
	Employee    Employee `gorm:"references:id"`
	Quantity    *uint
	Time        time.Time
}

/* -------------------------------------------------------------------------- */
/*                                   Service                                  */
/* -------------------------------------------------------------------------- */

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
	Q_ID           *uint
	QuotaCode      *QuotaCode `gorm:"references:id"`
	Paymenttype_ID *uint
	Paymenttype    Paymenttype `gorm:"references:id"`
	Bill_Price     uint
	Time_Stamp     time.Time
	QuotaCode_FK   []QuotaCode `gorm:"foreignKey:Q_ID"`
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
	//รอจาก Employee
	Time_Stamp time.Time
	QuotaCode  []QuotaCode `gorm:"foreignKey:Promotion_ID"`
}

type QuotaCode struct {
	gorm.Model
	Promotion_ID *uint
	Promotion    Promotion `gorm:"references:id"`
	Q_ID         *uint
	Bill         *Bill  `gorm:"references:id"`
	Bill_FK      []Bill `gorm:"foreignKey:Q_ID"`
}

/* -------------------------------------------------------------------------- */
/*                                   Recive                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                  Transport                                 */
/* -------------------------------------------------------------------------- */

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

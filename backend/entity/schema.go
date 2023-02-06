package entity

import (
	"time"

	"regexp"

	validator "github.com/asaskevich/govalidator"
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
	Customer_Name      string `valid:"required~Name not blank"`
	Customer_Username  string `valid:"matches(^[A-Z])~Username must be is Begin with A-Z ,required~Username not blank"`
	Customer_Phone     string `valid:"matches(^(0)([0-9]{9}))~Phonenumber is not valid,required~Phone not blank"`
	Customer_Promptpay string `valid:"matches((^[0][0-9]{9}$)|([0-9]{13}))~Promptpay is not valid,required~Promptpay not blank"`
	Customer_Password  string `valid:"minstringlength(6)~Password must be more than or equal to 6 characters,required~Password not blank"`
	Customer_Address   string `valid:"required~Address not blank"`

	Gender_ID *uint   `valid:"-"`
	Gender    Gender `gorm:"references:id" valid:"-"`

	Advertise_ID *uint `valid:"-"`
	Advertise    Advertise `gorm:"references:id" valid:"-"`

	Career_ID *uint `valid:"-"`
	Career    Career `gorm:"references:id" valid:"-"`

	Confirmation []Confirmation `gorm:"foreignKey:Customer_ID"`
	Service      []Service      `gorm:"foreignKey:Customer_ID"`
	Form         []Form         `gorm:"foreignKey:Customer_ID"`
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
}
type Brand struct {
	gorm.Model
	Band_Name string
	Stock     []Stock `gorm:"foreignKey:BrandID"`
}
type Size struct {
	gorm.Model
	Size_Name string
	Stock     []Stock `gorm:"foreignKey:SizeID"`
}

type Stock struct {
	gorm.Model
	List_Number uint `gorm:"uniqueIndex"`
	TypeID      *uint
	Type        Type `gorm:"references:id"`
	BrandID     *uint
	Brand       Brand `gorm:"references:id"`
	SizeID      *uint
	Size        Size `gorm:"references:id"`
	Employee_ID *uint
	Employee    Employee `gorm:"references:id"`
	Add_number  uint
	Quantity    uint
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
	Type_washing      string
	TypeWashing_Price uint
	Description       string
	Service           []Service `gorm:"foreignKey:TypeWashing_ID"`
}

type DeliveryType struct {
	gorm.Model
	DeliveryType_service string
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
	TypeWashing_ID *uint `valid:"-"`
	TypeWashing    TypeWashing `gorm:"references:id" valid:"-" `

	DeliveryType_ID *uint
	DeliveryType    DeliveryType `gorm:"references:id"`

	Weight_ID *uint	`valid:"-"`
	Weight    Weight `gorm:"references:id" valid:"-" `

	Customer_ID *uint	`valid:"-"`
	Customer    Customer `gorm:"references:id" valid:"-"`

	Bill_status uint
	Address     string `valid:"minstringlength(15)~โปรดระบุให้ละเอียด,alphabet~ที่อยู่เป็นตัวอักษรพิเศษหรือภาษาอังกฤษ,required~โปรดกรอกที่อยู่"`
	Bill_Price  float64
	Bill        []Bill `gorm:"foreignKey:Service_ID"`
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
	Brand_Name string
	Vehicle    []Vehicle `gorm:"foreignKey:Brand_Vehicle_ID"`
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
	ListModel        string `valid:"required~จำเป็นต้องกรอกรุ่นของรถ"`
	Registration     string `valid:"required~จำเป็นต้องกรอกทะเบียนรถ"`
	Date_Insulance   time.Time
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
	Complete_ID *uint    `valid:"-"` //prevent valid from this or upper entity
	Complete    Complete `gorm:"references:id" valid:"-"`
	Customer_ID *uint    `valid:"-"` //prevent valid from this or upper entity
	Customer    Customer `gorm:"references:id" valid:"-"`
	RecvTime    time.Time
	RecvAddress string `valid:"required~กรุณากรอกที่อยู่จัดส่ง"`
	RecvType_ID *uint
	RecvType    RecvType `gorm:"references:id"`
	Note        string
	Delivery    []Delivery `gorm:"foreignKey:Confirmation_ID"`
}

type RecvType struct {
	gorm.Model
	Name         string         `gorm:"uniqueIndex"`
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
	Vehicle_ID      *uint        `valid:"-"` //prevent valid from this or upper entity
	Vehicle         Vehicle      `gorm:"references:id" valid:"-"`
	Score           uint         `valid:"required~กรุณาให้คะแนนสภาพการขนส่ง, range(0|5)~ใส่คะแนนตั้งแต่ 0 ถึง 5"`
	Problem         string       `valid:"required~กรุณากรอกปัญหา หรือหากไม่มีให้ใส่ '-', maxstringlength(100)~กรอกได้สูงสุด 100 ตัวอักษร"`
}

// type Test struct {
// 	gorm.Model
// 	Name string
// }

func SetServiceValidation() {
	validator.CustomTypeTagMap.Set("alphabet", validator.CustomTypeValidator(func(address interface{}, context interface{}) bool {
		str := address.(string)
		match, _ := regexp.MatchString(`[0-9ก-๏]`, str)
		return match
	}))

	// validator.CustomTypeTagMap.Set("alphabetPro", validator.CustomTypeValidator(func(address interface{}, context interface{}) bool {
	// 	str := address.(string)
	// 	match, _ := regexp.MatchString(`[ควย]+[0-9ก-๏]`, str)
	// 	return match
	// }))
}

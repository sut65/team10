package entity

import (
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db

}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("se-laundry.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")

	}

	// Migrate the schema
	database.AutoMigrate(

		//Cutomer
		&Advertise{},
		&Career{},
		&Gender{},
		&Customer{},

		//Employee
		&Position{},
		&WorkShift{},
		&Employee{},

		//Stock
		&Type{},
		&Brand{},
		&Size{},
		&Stock{},

		//Service
		&TypeWashing{},
		&Delivery{},
		&Weight{},
		&Service{},

		//Form
		&Satisfaction{},
		&FormType{},
		&Form{},

		// Bill
		&Paymenttype{},
		&Bill{},

		//Promotion
		&Codetype{},
		&Reason{},
		&Promotion{},
		&QuotaCode{},

		//Receive
		&Detergent{},
		&Softener{},
		&Receive{},

		//Vehicle
		&Brand_Vehicle{},
		&Engine{},
		&Vehicle{},

		//Complete
		&Packaging{},
		&Complete{},

		//Confirmation
		&RecvType{},
		&Confirmation{},
	)
	db = database

	//employee
	//position
	po1 := Position{
		Position_Name: "ผู้จัดการ",
	}
	db.Model(&Position{}).Create(&po1)

	po2 := Position{
		Position_Name: "พนักงาน",
	}
	db.Model(&Position{}).Create(&po2)
	//gender
	male := Gender{
		Gender_Name: "Male",
	}
	db.Model(&Gender{}).Create(&male)

	female := Gender{
		Gender_Name: "Female",
	}
	db.Model(&Gender{}).Create(&female)
	//workshift
	W1 := WorkShift{
		Work_shift_Name: "8.00 -17.00",
	}
	db.Model(&WorkShift{}).Create(&W1)

	W2 := WorkShift{
		Work_shift_Name: "17.00 - 24.00",
	}
	db.Model(&WorkShift{}).Create(&W2)

	W3 := WorkShift{
		Work_shift_Name: "24.00 - 8.00",
	}
	db.Model(&WorkShift{}).Create(&W3)

	//Bill
	Paymenttype1 := Paymenttype{
		Type: "เก็บเงินปลายทาง",
	}
	Paymenttype2 := Paymenttype{
		Type: "พร้อมเพย์",
	}
	db.Model(&Paymenttype{}).Create(&Paymenttype1)
	db.Model(&Paymenttype{}).Create(&Paymenttype2)

	Service1 := Service{
		Address: "testbill",
	}
	db.Model(&Service{}).Create(&Service1)

	E1 := Employee{
		Personal_ID: "0000000000001",
		Username:    "Phonnapha Saentangchai",
		Name:        "พรนภา แสนต่างใจ",
		Gender:      female,
		Position:    po1,
		WorkShift:   W1,
		Phonnumber:  "0650235616",
		Address:     "มทส",
		Password:    "$2a$12$T1UMkc8oWw4HdgeOYmGhfOyvPHG.ELvd9VCcYk9sdfeJ2eW2oUTiK",
	}
	db.Model(&Employee{}).Create(&E1)
	E2 := Employee{
		Personal_ID: "0000000000001",
		Username:    "pubphee thee",
		Name:        "พับพีร์ ธีร์",
		Gender:      female,
		Position:    po1,
		WorkShift:   W1,
		Phonnumber:  "0650235617",
		Address:     "SUT",
		Password:    "$2a$12$T1UMkc8oWw4HdgeOYmGhfOyvPHG.ELvd9VCcYk9sdfeJ2eW2oUTiK",
	}
	db.Model(&Employee{}).Create(&E2)
	// end emp //

	//receive//
	Receive1 := Receive{
		Employee: E1,
	}
	Receive2 := Receive{
		Employee: E1,
	}
	db.Model(&Receive{}).Create(&Receive1)
	db.Model(&Receive{}).Create(&Receive2)
	//-------------------//

	//Vehicle
	//Brand_Vehicle
	Brand_Vehicle1 := Brand_Vehicle{
		Brand_Vehicle: "Yamaha",
	}
	Brand_Vehicle2 := Brand_Vehicle{
		Brand_Vehicle: "Honda",
	}
	Brand_Vehicle3 := Brand_Vehicle{
		Brand_Vehicle: "Vespa",
	}
	Brand_Vehicle4 := Brand_Vehicle{
		Brand_Vehicle: "Suzuki",
	}
	db.Model(&Brand_Vehicle{}).Create(&Brand_Vehicle1)
	db.Model(&Brand_Vehicle{}).Create(&Brand_Vehicle2)
	db.Model(&Brand_Vehicle{}).Create(&Brand_Vehicle3)
	db.Model(&Brand_Vehicle{}).Create(&Brand_Vehicle4)

	//Engine
	Engine1 := Engine{
		Engine: "100",
	}
	Engine2 := Engine{
		Engine: "110",
	}
	Engine3 := Engine{
		Engine: "125",
	}
	Engine4 := Engine{
		Engine: "150",
	}
	db.Model(&Engine{}).Create(&Engine1)
	db.Model(&Engine{}).Create(&Engine2)
	db.Model(&Engine{}).Create(&Engine3)
	db.Model(&Engine{}).Create(&Engine4)

	//---------------------------------Customer-------------------------------------//
	//Advertise
	Advertise1 := Advertise{
		Advertise_Type: "เพื่อน",
	}
	db.Model(&Advertise{}).Create(&Advertise1)

	Advertise2 := Advertise{
		Advertise_Type: "facebook",
	}
	db.Model(&Advertise{}).Create(&Advertise2)

	Advertise3 := Advertise{
		Advertise_Type: "Line",
	}
	db.Model(&Advertise{}).Create(&Advertise3)

	Advertise4 := Advertise{
		Advertise_Type: "instagram",
	}
	db.Model(&Advertise{}).Create(&Advertise4)

	Advertise5 := Advertise{
		Advertise_Type: "Twitter",
	}
	db.Model(&Advertise{}).Create(&Advertise5)

	Advertise6 := Advertise{
		Advertise_Type: "อื่นๆ",
	}
	db.Model(&Advertise{}).Create(&Advertise6)

	//Career
	Career1 := Career{
		Career_Name: "นักศึกษา",
	}
	db.Model(&Career{}).Create(&Career1)

	Career2 := Career{
		Career_Name: "ทหาร",
	}
	db.Model(&Career{}).Create(&Career2)

	Career3 := Career{
		Career_Name: "นักเรียน",
	}
	db.Model(&Career{}).Create(&Career3)

	Career4 := Career{
		Career_Name: "ครู",
	}
	db.Model(&Career{}).Create(&Career4)

	Career5 := Career{
		Career_Name: "แพทย์",
	}
	db.Model(&Career{}).Create(&Career5)

	Career6 := Career{
		Career_Name: "อื่นๆ",
	}
	db.Model(&Career{}).Create(&Career6)

	//Customer
	Customer1 := Customer{
		Customer_Name:      "สุดารัตน์  พร้อมจิตต์",
		Customer_Username:  "Cream_9",
		Customer_Phone:     "0967436705",
		Customer_Promptpay: "0912345265",
		Customer_Password:  "cream9",
		Customer_Address:   "มหาวิทยาลัยเทคโนโลยีสุรนารี หอพักสุรนิเวศ1",
		Gender:             female,
		Advertise:          Advertise1,
		Career:             Career1,
	}
	db.Model(&Customer{}).Create(&Customer1)

	Customer2 := Customer{
		Customer_Name:      "ปวีณา แจ่มดวง",
		Customer_Username:  "MOD_MOD",
		Customer_Phone:     "0612489105",
		Customer_Promptpay: "0854251253",
		Customer_Password:  "123123",
		Customer_Address:   "มหาวิทยาลัยเทคโนโลยีสุรนารี หอพักสุรนิเวศ3 ห้อง3204",
		Gender:             female,
		Advertise:          Advertise1,
		Career:             Career2,
	}
	db.Model(&Customer{}).Create(&Customer2)

	Customer3 := Customer{
		Customer_Name:      "ณัฐพงศ์ จงจุลกลาง",
		Customer_Username:  "NutSmall",
		Customer_Phone:     "0815426489",
		Customer_Promptpay: "0652465258",
		Customer_Password:  "Nuttttt",
		Customer_Address:   "หอพักปันสุข มทส. ประตู1 ต. สุรนารี เมืองนครราชสีมา",
		Gender:             male,
		Advertise:          Advertise4,
		Career:             Career4,
	}
	db.Model(&Customer{}).Create(&Customer3)

	Customer4 := Customer{
		Customer_Name:      "เจนนี่ เค",
		Customer_Username:  "Jenny_K.",
		Customer_Phone:     "0631489577",
		Customer_Promptpay: "0685445358",
		Customer_Password:  "J7845",
		Customer_Address:   "อพาร์ทเม้นท์โกลด์เดนคีย์ กังสดาล ม.ขอนแก่น",
		Gender:             female,
		Advertise:          Advertise3,
		Career:             Career3,
	}
	db.Model(&Customer{}).Create(&Customer4)

	Customer5 := Customer{
		Customer_Name:      "เอ็มเจ",
		Customer_Username:  "MJ-M",
		Customer_Phone:     "0974851364",
		Customer_Promptpay: "0815479546",
		Customer_Password:  "78496",
		Customer_Address:   "โบ๊ทลากูล รีสอร์ท ถ.เทพกระษัตรี เกาะแก้ว เมืองภูเก็ต",
		Gender:             male,
		Advertise:          Advertise2,
		Career:             Career3,
	}
	db.Model(&Customer{}).Create(&Customer5)

	//---------------------------------Complete-------------------------------------//
	//Packaging
	Packaging1 := Packaging{
		Packaging_Type: "ถุงซิปล็อค",
	}
	db.Model(&Packaging{}).Create(&Packaging1)

	Packaging2 := Packaging{
		Packaging_Type: "กล่องขนาดเล็ก",
	}
	db.Model(&Packaging{}).Create(&Packaging2)

	Packaging3 := Packaging{
		Packaging_Type: "กล่องขนาดใหญ่",
	}
	db.Model(&Packaging{}).Create(&Packaging3)

	Packaging4 := Packaging{
		Packaging_Type: "อื่นๆ",
	}
	db.Model(&Packaging{}).Create(&Packaging4)

	//complete
	complete1 := Complete{
		Model:             gorm.Model{},
		Complete_datetime: time.Time{},
		Employee:          E1,
		Receive:           Receive1,
		Packaging:         Packaging1,
	}
	db.Model(&Complete{}).Create(&complete1)

	complete2 := Complete{
		Model:             gorm.Model{},
		Complete_datetime: time.Time{},
		Employee:          E1,
		Receive:           Receive2,
		Packaging:         Packaging3,
	}
	db.Model(&Complete{}).Create(&complete2)

	complete3 := Complete{
		Model:             gorm.Model{},
		Complete_datetime: time.Time{},
		Employee:          E2,
		Receive:           Receive1,
		Packaging:         Packaging4,
	}
	db.Model(&Complete{}).Create(&complete3)
	t1 := Type{
		Type_Name: "ผงซักผ้า",
	}
	db.Model(&Type{}).Create(&t1)

	t2 := Type{
		Type_Name: "น้ำยาปรับผ้านุ่ม",
	}
	db.Model(&Type{}).Create(&t2)
	//size
	s1 := Size{
		Size_Name: "M",
	}
	db.Model(&Size{}).Create(&s1)

	s2 := Size{
		Size_Name: "L",
	}
	db.Model(&Size{}).Create(&s2)
	//brand
	B1 := Brand{
		Band_Name: "ดาวน์นี่",
	}
	db.Model(&Brand{}).Create(&B1)

	B2 := Brand{
		Band_Name: "eng",
	}

	db.Model(&Brand{}).Create(&B2)
	stock1 := Stock{
		List_Number: "11",
		Type:        t1,
		Brand:       B2,
		Size:        s1,
		Employee:    E1,
		Add_number:  "11",
		Quantity:    "12",
		Time:        time.Date(2022, 10, 23, 12, 30, 00, 00, time.Now().Local().Location())}
	db.Model(&Stock{}).Create(&stock1)

	recvt1 := RecvType{
		Name: "TypeA",
	}
	recvt2 := RecvType{
		Name: "TypeB",
	}
	recvt3 := RecvType{
		Name: "TypeC",
	}
	db.Model(&RecvType{}).Create(&recvt1)
	db.Model(&RecvType{}).Create(&recvt2)
	db.Model(&RecvType{}).Create(&recvt3)
}

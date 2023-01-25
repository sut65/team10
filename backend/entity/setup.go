package entity

import (
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
		&Brand_Vehicle{},
		&Engine{},
		&Receive{},
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
		Password:    "$2a$12$T1UMkc8oWw4HdgeOYmGhfOyvPHG.ELvd9VCcYk9sdfeJ2eW2oUTiK",
		Gender:      female,
		Position:    po1,
		WorkShift:   W1,
	}
	db.Model(&Employee{}).Create(&E1)
	E2 := Employee{
		Personal_ID: "0000000000001",
		Username:    "pubphee thee",
		Name:        "พับพีร์ ธีร์",
		Password:    "$2a$12$T1UMkc8oWw4HdgeOYmGhfOyvPHG.ELvd9VCcYk9sdfeJ2eW2oUTiK",
		Gender:      female,
		Position:    po1,
		WorkShift:   W1,
	}
	db.Model(&Employee{}).Create(&E2)

}

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

}

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

		// Bill
		&Paymenttype{},
		&Bill{},
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
}

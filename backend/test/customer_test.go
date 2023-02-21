package test

import (
	"testing"
	"time"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team10/entity"
)

// Customer ถูกทั้งหมด
func TestCustomerALLPass(t *testing.T) {
	g := NewGomegaWithT(t)

	Customer := entity.Customer{
		Customer_Name:      "Cream",
		Customer_Username:  "Cream_9",
		Customer_Phone:     "0967436705",
		Customer_Promptpay: "0912345265",
		Customer_Password:  "$2a$12$T1UMkc8oWw4HdgeOYmGhfOyvPHG.ELvd9VCcYk9sdfeJ2eW2oUTiK", //1234 //On test Purpose
		Customer_Address:   "มหาวิทยาลัยเทคโนโลยีสุรนารี หอพักสุรนิเวศ1",
		Customer_Datetime:  time.Time{},
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Customer)

	//ถ้าข้อมูลถูก ok จะเป็น true
	g.Expect(ok).To(BeTrue())

	//ถ้าข้อมูลถูก err จะเป็น nil
	g.Expect(err).To(BeNil())

}

// Name ห้ามว่าง
func TestNameNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	Customer := entity.Customer{
		Customer_Name:      "", //ผิด
		Customer_Username:  "Cream_9",
		Customer_Phone:     "0967436705",
		Customer_Promptpay: "0912345265",
		Customer_Password:  "$2a$12$T1UMkc8oWw4HdgeOYmGhfOyvPHG.ELvd9VCcYk9sdfeJ2eW2oUTiK", //1234 //On test Purpose
		Customer_Address:   "มหาวิทยาลัยเทคโนโลยีสุรนารี หอพักสุรนิเวศ1",
		Customer_Datetime:  time.Time{},
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Customer)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Name not blank"))
}

// ตรวจสอบusernameแล้วต้องเจอ Error
func TestUsernameNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	customer := entity.Customer{
		Customer_Name:      "สุดารัตน์ พร้อมจิตต์",
		Customer_Username:  "", //ผิด
		Customer_Phone:     "0967436705",
		Customer_Promptpay: "0912345265",
		Customer_Password:  "$2a$12$T1UMkc8oWw4HdgeOYmGhfOyvPHG.ELvd9VCcYk9sdfeJ2eW2oUTiK", //1234 //On test Purpose
		Customer_Address:   "มหาวิทยาลัยเทคโนโลยีสุรนารี หอพักสุรนิเวศ1",
		Customer_Datetime:  time.Time{},
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(customer)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Username not blank"))
}

// ตรวจสอบเบอร์โทรศัพท์แล้วต้องเจอ Error
func TestPhoneNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	customer := entity.Customer{
		Customer_Name:      "สุดารัตน์ พร้อมจิตต์",
		Customer_Username:  "Cream_9",
		Customer_Phone:     "", //ผิด
		Customer_Promptpay: "0912345265",
		Customer_Password:  "$2a$12$T1UMkc8oWw4HdgeOYmGhfOyvPHG.ELvd9VCcYk9sdfeJ2eW2oUTiK", //1234 //On test Purpose
		Customer_Address:   "มหาวิทยาลัยเทคโนโลยีสุรนารี หอพักสุรนิเวศ1",
		Customer_Datetime:  time.Time{},
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(customer)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Phone not blank"))
}

// ตรวจสอบpromptpayแล้วต้องเจอ Error
func TestPromptpayNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	customer := entity.Customer{
		Customer_Name:      "สุดารัตน์ พร้อมจิตต์",
		Customer_Username:  "Cream_9",
		Customer_Phone:     "0967436705",
		Customer_Promptpay: "",                                                             //ผิด
		Customer_Password:  "$2a$12$T1UMkc8oWw4HdgeOYmGhfOyvPHG.ELvd9VCcYk9sdfeJ2eW2oUTiK", //1234 //On test Purpose
		Customer_Address:   "มหาวิทยาลัยเทคโนโลยีสุรนารี หอพักสุรนิเวศ1",
		Customer_Datetime:  time.Time{},
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(customer)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Promptpay not blank"))
}

// ตรวจสอบPasswordแล้วต้องเจอ Error
func TestPasswordNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	customer := entity.Customer{
		Customer_Name:      "สุดารัตน์ พร้อมจิตต์",
		Customer_Username:  "Cream_9",
		Customer_Phone:     "0967436705",
		Customer_Promptpay: "0912345265",
		Customer_Password:  "", //ผิด
		Customer_Address:   "มหาวิทยาลัยเทคโนโลยีสุรนารี หอพักสุรนิเวศ1",
		Customer_Datetime:  time.Time{},
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(customer)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Password not blank"))
}

// ตรวจสอบPasswordแล้วต้องเจอ Error
func TestAddressdNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	customer := entity.Customer{
		Customer_Name:      "สุดารัตน์ พร้อมจิตต์",
		Customer_Username:  "Cream_9",
		Customer_Phone:     "0967436705",
		Customer_Promptpay: "0912345265",
		Customer_Password:  "$2a$12$T1UMkc8oWw4HdgeOYmGhfOyvPHG.ELvd9VCcYk9sdfeJ2eW2oUTiK", //1234 //On test Purpose
		Customer_Address:   "", 
		Customer_Datetime:  time.Time{},                                                            //ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(customer)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Address not blank"))
}

func TestCustomerUsername(t *testing.T) {
	g := NewGomegaWithT(t)

	//ทำการตรวจสอบ Username ห้ามเป็นอักษรพิเศษ
	fixtures := []string{
		"*rtyw7", //มีตัวอักษรพิเศษ
	}
	for _, fixture := range fixtures {
		customer := entity.Customer{
			Customer_Name:      "สุดารัตน์ พร้อมจิตต์",
			Customer_Username:  fixture,
			Customer_Phone:     "0967436705",
			Customer_Promptpay: "0912345265",
			Customer_Password:  "$2a$12$T1UMkc8oWw4HdgeOYmGhfOyvPHG.ELvd9VCcYk9sdfeJ2eW2oUTiK", //1234 //On test Purpose ,
			Customer_Address:   "มหาวิทยาลัยเทคโนโลยีสุรนารี หอพักสุรนิเวศ1",
			Customer_Datetime:  time.Time{},
		}

		ok, err := govalidator.ValidateStruct(customer)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Username not special characters"))
	}

}
func TestCustomerPhone(t *testing.T) {
	g := NewGomegaWithT(t)

	//ทำการตรวจสอบ Phone ต้องมีตัวเลข 0-9 เท่ากับ 10 ตัว ไม่มีตัวอักษร และขึ้นต้นด้วย 0
	// fixtures := []string{
	// 	"09647854",     //ผิดเพราะเลขไม่ครบ 10
	// 	"096478547492", //ผิดเพราะเลขเกิน 10
	// 	"14585265",     // ผิดเพราะเลขไม่ครบ 10 และตัวนำหน้าไม่ใช่ 0
	// 	"c096743670",   // ผิดเพราะมีตัวอักษร
	// 	"c0967ft70",    // ผิดเพราะมีตัวอักษร
	// }
	customer := entity.Customer{
		Customer_Name:      "สุดารัตน์ พร้อมจิตต์",
		Customer_Username:  "Cream_9",
		Customer_Phone:     "09647854",
		Customer_Promptpay: "0912345265",
		Customer_Password:  "$2a$12$T1UMkc8oWw4HdgeOYmGhfOyvPHG.ELvd9VCcYk9sdfeJ2eW2oUTiK", //1234 //On test Purpose ,
		Customer_Address:   "มหาวิทยาลัยเทคโนโลยีสุรนารี หอพักสุรนิเวศ1",
		Customer_Datetime:  time.Time{},
	}

	ok, err := govalidator.ValidateStruct(customer)

	g.Expect(ok).NotTo(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Phonenumber is not valid"))
}

func TestCustomerPromptpay(t *testing.T) {
	g := NewGomegaWithT(t)

	//ทำการตรวจสอบ Promptpay ต้องมีตัวเลข 0-9 เท่ากับ 10 ตัว ไม่มีตัวอักษรและขึ้นต้นด้วยเลข 0  หรือ ต้องมีตัวเลข 0-9 เท่ากับ 13 ตัว ไม่มีตัวอักษร
	// fixtures := []string{
	// 	"09647854",          //ผิดเพราะเลขไม่ครบ 10
	// 	"14585265",          // ผิดเพราะเลขไม่ครบ 10 และตัวนำหน้าไม่ใช่ 0
	// 	"c096743670",        // ผิดเพราะมีตัวอักษร
	// 	"1857945678",        // ผิดเพราะเลขไม่ครบ 13
	// 	"18579456784784525", // ผิดเพราะเลขเกิน 13
	// 	"185794567847GER",   // ผิดเพราะเลขเกิน 13 และมีตัวอักษร
	// 	"Er07899452367",     // ผิดเพราะมีตัวอักษร
	// }
	// for _, fixture := range fixtures {
	// 	customer := entity.Customer{
	// 		Customer_Name:      "สุดารัตน์ พร้อมจิตต์",
	// 		Customer_Username:  "Cream_9",
	// 		Customer_Phone:     "0967436705",
	// 		Customer_Promptpay: fixture,
	// 		Customer_Password:  "$2a$12$T1UMkc8oWw4HdgeOYmGhfOyvPHG.ELvd9VCcYk9sdfeJ2eW2oUTiK", //1234 //On test Purpose ,
	// 		Customer_Address:   "มหาวิทยาลัยเทคโนโลยีสุรนารี หอพักสุรนิเวศ1",
	// 	}

	customer := entity.Customer{
		Customer_Name:      "สุดารัตน์ พร้อมจิตต์",
		Customer_Username:  "Cream_9",
		Customer_Phone:     "0967436705",
		Customer_Promptpay: "Cream_9",
		Customer_Password:  "$2a$12$T1UMkc8oWw4HdgeOYmGhfOyvPHG.ELvd9VCcYk9sdfeJ2eW2oUTiK", //1234 //On test Purpose ,
		Customer_Address:   "มหาวิทยาลัยเทคโนโลยีสุรนารี หอพักสุรนิเวศ1",
		Customer_Datetime:  time.Time{},
	}

	ok, err := govalidator.ValidateStruct(customer)

	g.Expect(ok).NotTo(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Promptpay is not valid"))
}

func TestCustomerPassword(t *testing.T) {
	g := NewGomegaWithT(t)

	//ทำการตรวจสอบ Password ต้องมีตัวเลข 0-9 หรือ ตัวอักษร อย่างน้อย 8 ตัว
	fixtures := []string{
		"0000",  //ผิดเพราะเลขไม่ครบ 8
		"cream", // ผิดเพราะตัวอักษรไม่ครบ 8
		"cre6",  //ผิดเพราะไม่ครบ 8
	}
	for _, fixture := range fixtures {
		customer := entity.Customer{
			Customer_Name:      "สุดารัตน์ พร้อมจิตต์",
			Customer_Username:  "Cream_9",
			Customer_Phone:     "0967436705",
			Customer_Promptpay: "0912345265",
			Customer_Password:  fixture,
			Customer_Address:   "มหาวิทยาลัยเทคโนโลยีสุรนารี หอพักสุรนิเวศ1",
		}

		ok, err := govalidator.ValidateStruct(customer)

		g.Expect(ok).NotTo(BeTrue())

		g.Expect(err).ToNot(BeNil())

		g.Expect(err.Error()).To(Equal("Password must be more than or equal to 8 characters"))
	}

}

package test

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team10/entity"
)

func TestEmployeePass(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Employee{
		Personal_ID: "1499900256321",
		Username:    "NCT127",
		Name:        "sura ggg",
		Phonnumber:  "0912352558",
		Address:     "มหาวิทยาลัยเทคโนโลยีสุรนารี",
		Password:    "12345678", //12345678
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).To(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).To(BeNil())

}

func TestEmployeePersonalIDNotmatch(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Employee{
		Personal_ID: "1",
		Username:    "NCT",
		Name:        "sura ggg",
		Phonnumber:  "0912352558",
		Address:     "มหาวิทยาลัยเทคโนโลยีสุรนารี",
		Password:    "12345678", //12345678
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("PersonalId is not valid"))
}
func TestEmployeePersonalIDNotnull(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Employee{
		Personal_ID: "",
		Username:    "NCT",
		Name:        "sura ggg",
		Phonnumber:  "0912352558",
		Address:     "มหาวิทยาลัยเทคโนโลยีสุรนารี",
		Password:    "12345678", //12345678
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกรหัสประจำตัวประชาชน"))
}

func TestEmployeeUsernameNotnull(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Employee{
		Personal_ID: "1499900256321",
		Username:    "",
		Name:        "sura ggg",
		Phonnumber:  "0912352558",
		Address:     "มหาวิทยาลัยเทคโนโลยีสุรนารี",
		Password:    "12345678", //12345678
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอก Username"))
}
func TestEmployeeUsernameNotMatch(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Employee{
		Personal_ID: "1499900256321",
		Username:    "1 mmกก",
		Name:        "sura ggg",
		Phonnumber:  "0912352558",
		Address:     "มหาวิทยาลัยเทคโนโลยีสุรนารี",
		Password:    "12345678", //12345678
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Username not special characters"))
}

func TestEmployeeNameNotPass(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Employee{
		Personal_ID: "1499900256321",
		Username:    "ll",
		Name:        "",
		Phonnumber:  "0912352558",
		Address:     "มหาวิทยาลัยเทคโนโลยีสุรนารี",
		Password:    "12345678", //12345678
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อ - สกุล"))
}

func TestEmployeePhonnumberNotPass(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Employee{
		Personal_ID: "1499900256321",
		Username:    "ll",
		Name:        "kk",
		Phonnumber:  "045628",
		Address:     "มหาวิทยาลัยเทคโนโลยีสุรนารี",
		Password:    "12345678", //12345678
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Phonenumber is not valid"))
}

func TestEmployeePhonnumberNotnull(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Employee{
		Personal_ID: "1499900256321",
		Username:    "ll",
		Name:        "kk",
		Phonnumber:  "",
		Address:     "มหาวิทยาลัยเทคโนโลยีสุรนารี",
		Password:    "12345678", //12345678
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกเบอร์โทร"))
}

func TestEmployeeAddressNotPass(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Employee{
		Personal_ID: "1499900256321",
		Username:    "ll",
		Name:        "kk",
		Phonnumber:  "0912352558",
		Address:     "",
		Password:    "12345678", //12345678
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกที่อยู่"))
}
func TestEmployeePasswordNotPass(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Employee{
		Personal_ID: "1499900256321",
		Username:    "ll",
		Name:        "kk",
		Phonnumber:  "0912352558",
		Address:     "มทส",
		Password:    "1232",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Password must be more than or equal to 8 characters"))
}

func TestEmployeePasswordNotnull(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Employee{
		Personal_ID: "1499900256321",
		Username:    "ll",
		Name:        "kk",
		Phonnumber:  "0912352558",
		Address:     "มทส",
		Password:    "",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกรหัสผ่าน"))
}

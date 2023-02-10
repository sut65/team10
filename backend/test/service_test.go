package test

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team10/entity"
)

// ตรวจสอบค่าว่างของชื่อแล้วต้องเจอ Error
func TestAddressNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	service := entity.Service{
		Address:"", // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(service)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("โปรดกรอกที่อยู่"))
}

func TestAddressNotSpecialCharacters(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetSpecialCharactersValidation()

	service := entity.Service{
		Address:"%$&", // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(service)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ที่อยู่เป็นตัวอักษรพิเศษหรือภาษาอังกฤษ"))
}

func TestMinAddress(t *testing.T) {
	g := NewGomegaWithT(t)

	service := entity.Service{
		Address:"1212", // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(service)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("โปรดระบุให้ละเอียด"))
}

func TestZero(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetTimeandValueValidation()

	service := entity.Service{
		Address: "000000000000000000000",
		Bill_Price: 0, // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(service)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ราคาเท่ากับ 0"))
}




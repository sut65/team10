package test

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team10/entity"
)

// ตรวจสอบจำนวนของผงซักฟอกแล้วต้องเจอ Error
func TestDetQuantityNotNegative(t *testing.T) {
	g := NewGomegaWithT(t)

	receive := entity.Receive{
		Det_Quantity: 101, // ผิด
		Sof_Quantity: 1,
		Time_Stamp:   time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(receive)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("จำนวนผงซักฟอกห้ามเป็นลบ"))
}

// ตรวจสอบจำนวนของน้ำยาแล้วต้องเจอ Error
func TestSofQuantityNotNegative(t *testing.T) {
	g := NewGomegaWithT(t)

	receive := entity.Receive{
		Det_Quantity: 1,
		Sof_Quantity: 101, // ผิด
		Time_Stamp:   time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(receive)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("จำนวนน้ำยาปรับผ้านุ่มห้ามเป็นลบ"))
}

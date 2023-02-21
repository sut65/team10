package test

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team10/entity"
)

// Receive ถูกทั้งหมด
func TestReceiveALLPass(t *testing.T) {
	g := NewGomegaWithT(t)

	receive := entity.Receive{
		Det_Quantity: 1,
		Sof_Quantity: 1,
		Time_Stamp:   time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(receive)

	//ถ้าข้อมูลถูก ok จะเป็น true
	g.Expect(ok).To(BeTrue())

	//ถ้าข้อมูลถูก err จะเป็น nil
	g.Expect(err).To(BeNil())

}

// ตรวจสอบจำนวนของผงซักฟอกแล้วต้องเจอ Error
func TestDetQuantityNotNegative(t *testing.T) {
	g := NewGomegaWithT(t)

	receive := entity.Receive{
		Det_Quantity: -1, // ผิด
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
	g.Expect(err.Error()).To(Equal("จำนวนผงซักฟอกต้องไม่เป็นลบ"))
}

// ตรวจสอบจำนวนของน้ำยาปรับผ้านุ่มแล้วต้องเจอ Error
func TestSofQuantityNotNegative(t *testing.T) {
	g := NewGomegaWithT(t)

	receive := entity.Receive{
		Det_Quantity: 1,
		Sof_Quantity: -1, // ผิด
		Time_Stamp:   time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(receive)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("จำนวนน้ำยาปรับผ้านุ่มต้องไม่เป็นลบ"))
}

// ตรวจสอบเวลาแล้วต้องเจอ Error
func TestTimeStampNotPast(t *testing.T) {
	g := NewGomegaWithT(t)

	receive := entity.Receive{
		Det_Quantity: 1,
		Sof_Quantity: 1,
		Time_Stamp:   time.Now().Add(time.Second * -300), // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(receive)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เวลาห้ามเป็นอดีต"))
}

// ตรวจสอบเวลาแล้วต้องเจอ Error
func TestTimeStampNotFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	receive := entity.Receive{
		Det_Quantity: 1,
		Sof_Quantity: 1,
		Time_Stamp:   time.Now().Local().Add(time.Second * 5000), // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(receive)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เวลาห้ามเป็นอนาคต"))
}

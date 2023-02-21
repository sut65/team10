package test

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team10/entity"
)

// Bill ถูกทั้งหมด
func TestBillALLPass(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Bill{
		Bill_Price: 2,
		Time_Stamp: time.Now().Local().Add(time.Second * 200),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	//ถ้าข้อมูลถูก ok จะเป็น true
	g.Expect(ok).To(BeTrue())

	//ถ้าข้อมูลถูก err จะเป็น nil
	g.Expect(err).To(BeNil())

}

// ตรวจสอบเวลาห้ามเป็นอนาคตเกิน 5 นาที
func TestBillDateTimeNotFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Bill{
		Bill_Price: 2,
		Time_Stamp: time.Now().Local().Add(time.Second * 5000), // ผิด //เวลาจะเกินไป
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เวลาห้ามเป็นอนาคต"))
}

// วันเวลาห้ามเป็นอดีตเกิน5นาที
func TestBillDateTimeNotPass(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Bill{
		Bill_Price: 200,
		Time_Stamp: time.Now().Add(time.Second * -300), // ผิด //เวลาจะผิดไป 1 วินาที เพราะตอน assign ค่าจะมี delay ไป 1s
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เวลาห้ามเป็นอดีต"))
}

// วันเวลาห้ามเป็นอดีตเกิน5นาที
func TestBillDateTimeNotNull(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Bill{
		Bill_Price: 200,
		Time_Stamp: time.Time{}, // ผิด 0001-01-01 00:00:00 +0000 UTC
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาใส่เวลาให้ถูกต้อง"))
}

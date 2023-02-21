package test

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team10/entity"
)

// Promotion ถูกทั้งหมด
func TestPromotionALLPass(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Promotion{
		Price:      1, // ผิด
		Amount:     2,
		Time_Stamp: time.Now().Local().Add(time.Second * 200),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	//ถ้าข้อมูลถูก ok จะเป็น true
	g.Expect(ok).To(BeTrue())

	//ถ้าข้อมูลถูก err จะเป็น nil
	g.Expect(err).To(BeNil())

}

// ตรวจสอบจำนวนเงินห้ามเป็นค่าติดลบ
func TestPriceNotNegative(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Promotion{
		Price:      -1, // ผิด
		Amount:     2,
		Time_Stamp: time.Now().Local(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("จำนวนเงินห้ามติดลบ"))
}

// จำนวน code ห้ามเป็นค่าลบ
func TestAmountNotNegative(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Promotion{
		Price:      2,
		Amount:     -2, // ผิด
		Time_Stamp: time.Now().Local(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("จำนวน Code ห้ามติดลบ"))
}

// วันเวลาห้ามเป็นอดีตเกิน5นาที
func TestDateTimeNotPass(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Promotion{
		Price:      2,
		Amount:     2,
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

// วันเวลาห้ามเป็นอนาคตเกิน5นาที
func TestDateTimeNotFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Promotion{
		Price:      2,
		Amount:     2,
		Time_Stamp: time.Now().Local().Add(time.Second * 5000), // ผิด //เวลาจะเกินไป 1 วินาที
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

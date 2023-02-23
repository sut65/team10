package test

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team10/entity"
)

func TestStockPass(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Stock{
		List_Number: "1234567890",
		Quantity:    12,
		Time:        time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).To(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).To(BeNil())

}
func TestListnumberNotpass(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Stock{
		List_Number: "1234",
		Quantity:    12,
		Time:        time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ListNumber is not valid"))
}

func TestListnumberNotnull(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Stock{
		List_Number: "",
		Quantity:    12,
		Time:        time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกรหัสรายการ"))
}

func TestQuantityNotNegative(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Stock{
		List_Number: "1234567890",
		Quantity:    -12,
		Time:        time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกจำนวนเป็นจำนวนเต็มบวก"))
}

func TestQuantityNotzero(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Stock{
		List_Number: "1234567890",
		Quantity:    0,
		Time:        time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกจำนวน"))
}

// วันเวลาห้ามเป็นอดีตเกิน5นาที
func TestDateTimeNotinPass(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Stock{
		List_Number: "1234567890",
		Quantity:    12,
		Time:        time.Now().Add(time.Second * -300), // ผิด //เวลาจะผิดไป 1 วินาที เพราะตอน assign ค่าจะมี delay ไป 1s,

	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกวันเวลาปัจจุบัน ไม่เป็นอดีต"))

}

// วันเวลาห้ามเป็นอนาคตเกิน5นาที
func TestDateTimeNotfuture(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Stock{
		List_Number: "1234567890",
		Quantity:    12,
		Time:        time.Now().Local().Add(time.Second * 5000), // ผิด //เวลาจะเกินไป 1 วินาที
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกวันเวลาปัจจุบัน ไม่เป็นอนาคต"))
}

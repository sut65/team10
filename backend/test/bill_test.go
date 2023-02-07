package test

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team10/entity"
)

// ตรวจสอบเวลาห้ามเป็นอนาคตเกิน 5 นาที
func TestBillDateTimeNotFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Bill{
		Bill_Price: 2,
		Time_Stamp: time.Now().Add(time.Second * 300), // ผิด //เวลาจะเกินไป 1 วินาที
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

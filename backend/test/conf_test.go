package test

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team10/entity"
)

// ตรวจสอบเวลาแล้วต้องเจอ Error
func TestConfTimeNotPast(t *testing.T) {
	g := NewGomegaWithT(t)

	conf := entity.Confirmation{
		RecvTime:    time.Now().Local().Add(time.Second * -300), // ผิด time is in past
		RecvAddress: "Some location",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(conf)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เวลาต้องไม่เป็นอดีต"))
}

// Datetime not null
func TestConfTimeNotNull(t *testing.T) {
	g := NewGomegaWithT(t)

	conf := entity.Confirmation{
		RecvTime:    time.Time{}, // ผิด RecvTime is Null
		RecvAddress: "Some location",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(conf)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ต้องใส่ข้อมูลเวลา"))
}

func TestRecvAddressNotNull(t *testing.T) {
	g := NewGomegaWithT(t)

	conf := entity.Confirmation{
		RecvTime:    time.Now().Local(),
		RecvAddress: "",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(conf)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกที่อยู่จัดส่ง"))
}

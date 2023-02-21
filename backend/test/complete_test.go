package test

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team10/entity"
)

// Complete ถูกทั้งหมด
func TestCompleteALLPass(t *testing.T) {
	g := NewGomegaWithT(t)

	complete := entity.Complete{
		Complete_datetime: time.Now().Local().Add(time.Second * 200),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(complete)

	//ถ้าข้อมูลถูก ok จะเป็น true
	g.Expect(ok).To(BeTrue())

	//ถ้าข้อมูลถูก err จะเป็น nil
	g.Expect(err).To(BeNil())

}

// ตรวจสอบเวลาแล้วต้องเจอ Error
func TestTimeNotPast(t *testing.T) {
	g := NewGomegaWithT(t)

	complete := entity.Complete{
		Complete_datetime: time.Now().Local().Add(time.Second * -300), // ผิด

	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(complete)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("DateTime Not Past"))
}

// ตรวจสอบเวลาแล้วต้องเจอ Error
func TestTimeNotFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	complete := entity.Complete{

		Complete_datetime: time.Now().Local().Add(time.Second * 5000), // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(complete)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("DateTime Not Future"))
}

// วันเวลาห้ามเป็นอดีตเกิน5นาที
func TestTimeNotNull(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Complete{
		Complete_datetime: time.Time{}, // ผิด 0001-01-01 00:00:00 +0000 UTC
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("DateTime Not Null"))
}

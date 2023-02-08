package test

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team10/entity"
)


// ตรวจสอบเวลาแล้วต้องเจอ Error
func TestTimeNotPast(t *testing.T) {
	g := NewGomegaWithT(t)

	complete := entity.Complete{
		Complete_datetime: time.Now().Add(time.Second * -300), // ผิด

	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(complete)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เวลาห้ามเป็นอดีต"))
}

// ตรวจสอบเวลาแล้วต้องเจอ Error
func TestTimeNotFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	complete := entity.Complete{

		Complete_datetime: time.Now().Add(time.Second * 300), // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(complete)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เวลาห้ามเป็นอนาคต"))
}

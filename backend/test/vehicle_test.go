package test

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team10/entity"
)

// ตรวจสอบรุ่นของรถแล้วต้องเจอ Error
func TestModelNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	vehicle := entity.Vehicle{
		ListModel:      "", // ผิด
		Vehicle_Rigis:  "กษ5336",
		Date_Insulance: time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(vehicle)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("จำเป็นต้องกรอกรุ่นของรถ"))
}

// // ตรวจสอบทะเบียนรถแล้วต้องเจอ Error
// func TestRegistrationNotBlank(t *testing.T) {
// 	g := NewGomegaWithT(t)

// 	vehicle := entity.Vehicle{
// 		ListModel:      "Scoopyi",
// 		Vehicle_Rigis:  "", // ผิด
// 		Date_Insulance: time.Now(),
// 	}

// 	// ตรวจสอบด้วย govalidator
// 	ok, err := govalidator.ValidateStruct(vehicle)

// 	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
// 	g.Expect(ok).ToNot(BeTrue())

// 	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
// 	g.Expect(err).ToNot(BeNil())

// 	// err.Error ต้องมี error message แสดงออกมา
// 	g.Expect(err.Error()).To(Equal("จำเป็นต้องกรอกทะเบียนรถ"))
// }

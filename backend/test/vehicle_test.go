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
		Registration:   "กษ5336",
		Date_Insulance: time.Now().Add(time.Second * 300),
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

// ตรวจสอบทะเบียนรถแล้วต้องเจอ Error
func TestRegistrationNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	vehicle := entity.Vehicle{
		ListModel:      "Scoopyi",
		Registration:   "", // ผิด
		Date_Insulance: time.Now().Add(time.Second * 300),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(vehicle)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("จำเป็นต้องกรอกทะเบียนรถ"))
}

// ตรวจสอบเวลาแล้วต้องเจอ Error
func TestDateInsulanceNotPast(t *testing.T) {
	g := NewGomegaWithT(t)

	vehicle := entity.Vehicle{
		ListModel:      "Scoopyi",
		Registration:   "กษ5336",
		Date_Insulance: time.Now().Add(time.Second * -300), // ผิด //เวลาจะเกินไป 1 วินาที
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(vehicle)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เวลาห้ามเป็นอดีต"))
}

// ตรวจสอบเวลาแล้วต้องเจอ Error
func TestDateInsulanceNotNull(t *testing.T) {
	g := NewGomegaWithT(t)

	p := entity.Vehicle{
		ListModel:      "Scoopyi",
		Registration:   "กษ5336",
		Date_Insulance: time.Time{}, // ผิด 0001-01-01 00:00:00 +0000 UTC
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

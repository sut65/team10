package test

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team10/entity"
)

// Vehicle ถูกทั้งหมด
func TestVehicleALLPass(t *testing.T) {
	g := NewGomegaWithT(t)

	vehicle := entity.Vehicle{
		ListModel:      "Scoopyi",
		Registration:   "กษ5336",
		Date_Insulance: time.Now().Add(time.Second * 300),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(vehicle)

	//ถ้าข้อมูลถูก ok จะเป็น true
	g.Expect(ok).To(BeTrue())

	//ถ้าข้อมูลถูก err จะเป็น nil
	g.Expect(err).To(BeNil())

}

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

func TestRegistrationLength7(t *testing.T) {
	g := NewGomegaWithT(t)

	vehicle := entity.Vehicle{
		ListModel:      "Scoopyi",
		Registration:   "11กษ53366", // ผิด
		Date_Insulance: time.Now().Add(time.Second * 300),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(vehicle)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรอกทะเบียนรถได้สูงสุด 7 ตัว"))
}

func TestRegistrationMustNumber(t *testing.T) {
	g := NewGomegaWithT(t)

	vehicle := entity.Vehicle{
		ListModel:      "Scoopyi",
		Registration:   "กษสว", // ผิด
		Date_Insulance: time.Now().Add(time.Second * 300),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(vehicle)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ต้องมีตัวเลขอย่างน้อย 1 ตัว"))
}

func TestRegistrationMustCharacter(t *testing.T) {
	g := NewGomegaWithT(t)

	vehicle := entity.Vehicle{
		ListModel:      "Scoopyi",
		Registration:   "125336", // ผิด
		Date_Insulance: time.Now().Add(time.Second * 300),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(vehicle)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ต้องมีตัวอักษรภาษาไทยอย่างน้อย 1 ตัว"))
}

// ตรวจสอบเวลาแล้วต้องเจอ Error
func TestDateInsulanceNotPast(t *testing.T) {
	g := NewGomegaWithT(t)

	vehicle := entity.Vehicle{
		ListModel:      "Scoopyi",
		Registration:   "กษ5336",
		Date_Insulance: time.Now().Add(time.Hour * -25), // ผิด
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

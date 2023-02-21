package test

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team10/entity"
)

// Delivery ถูกทั้งหมด
func TestDeliveryALLPass(t *testing.T) {
	g := NewGomegaWithT(t)

	deli := entity.Delivery{
		Score:   5,
		Problem: "-",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(deli)

	//ถ้าข้อมูลถูก ok จะเป็น true
	g.Expect(ok).To(BeTrue())

	//ถ้าข้อมูลถูก err จะเป็น nil
	g.Expect(err).To(BeNil())

}

func TestDeliveryScoreNotNull(t *testing.T) {
	g := NewGomegaWithT(t)

	var score_null uint // make pointer and not assign any value so this pointer is 'nil' or 'null'

	deli := entity.Delivery{
		Score:   score_null, // score is null
		Problem: "-",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(deli)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาให้คะแนนสภาพการขนส่ง"))
}

func TestDeliveryScoreNotInRange(t *testing.T) {
	g := NewGomegaWithT(t)

	deli := entity.Delivery{
		Score:   6, // ผิด score is not in range 1-5
		Problem: "-",
	}

	ok, err := govalidator.ValidateStruct(deli)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("ใส่คะแนนตั้งแต่ 1 ถึง 5"))
}

func TestDeliveryProblemNotNull(t *testing.T) {
	g := NewGomegaWithT(t)

	deli := entity.Delivery{
		Score:   5,
		Problem: "", // Wrong Problem is null (empty)
	}

	ok, err := govalidator.ValidateStruct(deli)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกปัญหา หรือหากไม่มีให้ใส่ '-'"))
}

func TestDeliveryProblemMax100(t *testing.T) {
	g := NewGomegaWithT(t)

	deli := entity.Delivery{
		Score:   5,
		Problem: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean ma+", //wrong random string with '101' char
	}

	ok, err := govalidator.ValidateStruct(deli)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรอกได้สูงสุด 100 ตัวอักษร"))
}

//lol forgot to move task to doing

package test

import (
	"testing"
	
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	// "github.com/sut65/team10/controller/form"
	"github.com/sut65/team10/entity"
)

// ตรวจสอบค่าว่างของชื่อแล้วต้องเจอ Error
func TestCommentNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	form := entity.Form{
		Comment:"", // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(form)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("โปรดแสดงความคิดเห็น"))
}

func TestCommentSpecialCharacter(t *testing.T) {
	g := NewGomegaWithT(t)
	entity.SetSpecialCharactersValidation()

	form := entity.Form{
		Comment:"%$&^*", // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(form)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ห้ามใช้ตัวอักษรพิเศษ"))
}


func TestMaxComment(t *testing.T) {
	g := NewGomegaWithT(t)

	form := entity.Form{
		Comment:"00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", // ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(form)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรอกได้สูงสุด 50 ตัวอักษร"))
}

// func TestFormType(t *testing.T) {
// 	g := NewGomegaWithT(t)

// 	id := 1

// 	// ตรวจสอบด้วย govalidator
// 	ok, err := controller.Validatecheckformtype(id)

// 	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
// 	g.Expect(ok).NotTo(BeTrue())

// 	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
// 	g.Expect(err).NotTo(BeNil())

// 	// err.Error() ต้องมี message แสดงออกมา
// 	g.Expect(err.Error()).To(Equal("หัวข้อการประเมินซ้ำกัน"))
// }




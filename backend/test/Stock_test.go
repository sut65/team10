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
		Time:  time.Now(),
		
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(p)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).To(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).To(BeNil())

}



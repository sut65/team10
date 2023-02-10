package test

import (
	"math/rand"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"github.com/sut65/team10/entity"
)

/* -------------------------------------------------------------------------- */
/*                              random component                              */
/* -------------------------------------------------------------------------- */

const charset = "abcdefghijklmnopqrstuvwxyz" +
	"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

var seededRand *rand.Rand = rand.New(
	rand.NewSource(time.Now().UnixNano()))

func StringWithCharset(length int, charset string) string {
	b := make([]byte, length)
	for i := range b {
		b[i] = charset[seededRand.Intn(len(charset))]
	}
	return string(b)
}

func String(length int) string {
	return StringWithCharset(length, charset)
}

/* -------------------------------------------------------------------------- */
/*                           end of random component                          */
/* -------------------------------------------------------------------------- */
func TestDeliveryScoreNotNull(t *testing.T) {
	g := NewGomegaWithT(t)

	var score_null uint // make pointer and not assign any value so this pointer is 'nil' or 'null'

	deli := entity.Delivery{
		Score:   score_null, // score is null
		Problem: String(100),
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
		Score:   6, // ผิด score is not in range 0-5
		Problem: String(100),
	}

	ok, err := govalidator.ValidateStruct(deli)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("ใส่คะแนนตั้งแต่ 0 ถึง 5"))
}

func TestDeliveryProblemNotNull(t *testing.T) {
	g := NewGomegaWithT(t)

	random_score := uint(rand.Intn(5 - 0)) // Rand 0 - 5 for fair test

	deli := entity.Delivery{
		Score:   random_score,
		Problem: "", // Wrong Problem is null (empty)
	}

	ok, err := govalidator.ValidateStruct(deli)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกปัญหา หรือหากไม่มีให้ใส่ '-'"))
}

func TestDeliveryProblemMax100(t *testing.T) {
	g := NewGomegaWithT(t)

	random_score := uint(rand.Intn(5 - 0)) // Rand 0 - 5 for fair test

	deli := entity.Delivery{
		Score:   random_score,
		Problem: String(101), //wrong random string with '101' char
	}

	ok, err := govalidator.ValidateStruct(deli)
	g.Expect(ok).ToNot(BeTrue())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรอกได้สูงสุด 100 ตัวอักษร"))
}

//lol forgot to move task to doing

package controller

import (
	"net/http"

	"gorm.io/gorm"

	govalidator "github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// POST /promotions

func CreatePromotion(c *gin.Context) {
	var promotion entity.Promotion
	var reason entity.Reason
	var codetype entity.Codetype
	var employee entity.Employee

	if err := c.ShouldBindJSON(&promotion); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา Employee ด้วยไอดี
	if tx := entity.DB().Where("id = ?", promotion.Employee_ID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})

		return

	}

	//9: ค้นหา Codetype ด้วยไอดี
	if tx := entity.DB().Where("id = ?", promotion.Codetype_ID).First(&codetype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "codetype not found"})

		return

	}

	//10: ค้นหา Reason ด้วยไอดี
	if tx := entity.DB().Where("id = ?", promotion.Reason_ID).First(&reason); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reason not found"})

		return

	}

	//12: สร้าง
	p := entity.Promotion{
		Model:       gorm.Model{ID: promotion.ID},
		Codetype_ID: promotion.Codetype_ID,
		Reason_ID:   promotion.Reason_ID,
		Price:       promotion.Price,
		Amount:      promotion.Amount,
		Employee_ID: promotion.Employee_ID,
		Time_Stamp:  promotion.Time_Stamp.Local(),
	}
	b := entity.Bill{
		Model: gorm.Model{ID: 0},
	}

	if _, err := govalidator.ValidateStruct(p); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//13: บันทึก
	if err := entity.DB().Create(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// func gen Quotacode
	for i := 0; i < int(promotion.Amount); i++ {
		q := entity.QuotaCode{
			Promotion_ID: &p.ID,
			Bill_ID:      &b.ID,
		}
		if err := entity.DB().Create(&q).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}
	c.JSON(http.StatusOK, gin.H{"data": p})

}

// GET /promotion/:id

func GetPromotion(c *gin.Context) {
	var promotion entity.Promotion
	id := c.Param("id")
	if err := entity.DB().Preload("Codetype").Preload("Employee").Preload("Reason").Raw("SELECT * FROM promotions WHERE id = ?", id).Find(&promotion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": promotion})
}

// GET /promotions

func ListPromotions(c *gin.Context) {
	var promotion []entity.Promotion
	if err := entity.DB().Preload("Codetype").Preload("Employee").Preload("Reason").Raw("SELECT * FROM promotions").Find(&promotion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// q := entity.{
	// 	Promotion_ID: &p,
	// }
	// if err := entity.DB().Create(&q).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	c.JSON(http.StatusOK, gin.H{"data": promotion})

}

// PATCH /promotions

func UpdatePromotion(c *gin.Context) {
	var promotion entity.Promotion

	if err := c.ShouldBindJSON(&promotion); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง
	u_p := entity.Promotion{
		Price:       promotion.Price,
		Employee_ID: promotion.Employee_ID,
		Time_Stamp:  promotion.Time_Stamp.Local(),
	}

	if _, err := govalidator.ValidateStruct(u_p); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Where("id = ?", promotion.ID).Updates(&u_p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u_p})

}

// DELETE /promotions/:id
func DeletePromotion(c *gin.Context) {
	var promotion entity.Promotion

	if err := c.ShouldBindJSON(&promotion); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Exec("DELETE FROM promotions WHERE id = ?", promotion.ID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "promotion not found"})
		return
	}

	//ใช้สำหรับลบ quotacode โดยกำหนดไว้ว่าต้องการให้ลบเฉพาะ code ที่ยังไม่ถูกใช้งานเท่านั้น เพื่อไม่ให้ข้อมูลเก่าของลูกค้าที่เคยใช้หายไป
	//และไม่ให้โค๊ดที่ยังไม่ถูกใช้งาน สามารถค้นหาและนำไปใช้งานได้
	if tx := entity.DB().Exec("DELETE FROM quota_codes WHERE bill_id = 0 AND promotion_id = ?", promotion.ID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "quotacode not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": promotion})
}

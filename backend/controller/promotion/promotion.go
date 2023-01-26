package controller

import (
	"net/http"

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
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type Game not found"})

		return

	}

	//9: ค้นหา Codetype ด้วยไอดี
	if tx := entity.DB().Where("id = ?", promotion.Codetype_ID).First(&codetype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type Game not found"})

		return

	}

	//10: ค้นหา Reason ด้วยไอดี
	if tx := entity.DB().Where("id = ?", promotion.Reason_ID).First(&reason); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type Game not found"})

		return

	}

	//12: สร้าง
	p := entity.Promotion{
		Codetype_ID: promotion.Codetype_ID,
		Reason_ID:   promotion.Reason_ID,
		Price:       promotion.Price,
		Amount:      promotion.Amount,
		Employee_ID: promotion.Employee_ID,
		Time_Stamp:  promotion.Time_Stamp.Local(),
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
			Promotion_ID: &promotion.ID,
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
	if err := entity.DB().Raw("SELECT * FROM promotions WHERE id = ?", id).Scan(&promotion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": promotion})
}

// GET /promotions

func ListPromotions(c *gin.Context) {
	var promotion []entity.Promotion
	if err := entity.DB().Raw("SELECT * FROM promotions").Scan(&promotion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": promotion})

}

// PATCH /promotions

func UpdatePromotion(c *gin.Context) {
	var promotion entity.Promotion
	if err := c.ShouldBindJSON(&promotion); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", promotion.ID).First(&promotion); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if err := entity.DB().Save(&promotion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": promotion})

}

// DELETE /promotions/:id
func DeletePromotion(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM promotions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "confirmation not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
	"gorm.io/gorm/clause"
)

// POST /delivery
func CreateDelivery(c *gin.Context) {

	var delivery entity.Delivery
	var vehicle entity.Vehicle
	var confirmation entity.Confirmation
	var employee entity.Employee

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร delivery
	if err := c.ShouldBindJSON(&delivery); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา recvtype ด้วย id
	if tx := entity.DB().Where("id = ?", delivery.Vehicle_ID).First(&vehicle); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "vehicle not found"})
		return
	}

	// 10: ค้นหา disease ด้วย id
	if tx := entity.DB().Where("id = ?", delivery.Confirmation_ID).First(&confirmation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "confirmation not found"})
		return
	}

	// 10: ค้นหา disease ด้วย id
	if tx := entity.DB().Where("id = ?", delivery.Employee_ID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// 12: สร้าง Delivery
	d := entity.Delivery{
		Confirmation: confirmation,
		Vehicle:      vehicle,
		Employee:     employee,
		Score:        delivery.Score,
		Problem:      delivery.Problem,
	}

	// validate before save
	if _, err := govalidator.ValidateStruct(d); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&d).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": d})
}

// GET /delivery/:id
func GetDelivery(c *gin.Context) {
	var delivery entity.Delivery
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&delivery); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "delivery not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": delivery})
}

// GET /deliveries/:id
func ListDeliveriesByID(c *gin.Context) {
	var deliveries []entity.Delivery
	employee_id := c.Param("id")
	if err := entity.DB().Preload(clause.Associations).Where("employee_id =?", employee_id).Find(&deliveries).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": deliveries})
}

// DELETE /deliverys/:id
func DeleteDelivery(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM deliveries WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "delivery not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

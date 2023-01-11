package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// POST /confirmation
func CreateConfirmation(c *gin.Context) {

	var confirmation entity.Confirmation
	var recvtype entity.RecvType
	var complete entity.Complete
	var customer entity.Customer

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร confirmation
	if err := c.ShouldBindJSON(&confirmation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา recvtype ด้วย id
	if tx := entity.DB().Where("id = ?", confirmation.RecvType_ID).First(&recvtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "recvtype not found"})
		return
	}

	// 10: ค้นหา disease ด้วย id
	if tx := entity.DB().Where("id = ?", confirmation.Complete_ID).First(&complete); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "complete not found"})
		return
	}

	// 10: ค้นหา disease ด้วย id
	if tx := entity.DB().Where("id = ?", confirmation.Customer_ID).First(&customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "customer not found"})
		return
	}

	// 12: สร้าง Confirmation
	con := entity.Confirmation{
		Complete:    complete,
		RecvType:    recvtype,                 // โยงความสัมพันธ์กับ Entity Confirmation_Type
		RecvTime:    confirmation.RecvTime,    // โยงความสัมพันธ์กับ Entity Disease
		RecvAddress: confirmation.RecvAddress, // โยงความสัมพันธ์กับ Entity Patient
		Customer:    customer,                 // โยงความสัมพันธ์กับ Entity Employee
		Note:        confirmation.Note,        // ตั้งค่าฟิลด์ Symptom
	}

	// 13: บันทึก
	if err := entity.DB().Create(&con).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": con})
}

// GET /confirmation/:id
func GetConfirmation(c *gin.Context) {
	var confirmation entity.Confirmation
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&confirmation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "confirmation not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": confirmation})
}

// GET /confirmation
func ListConfirmations(c *gin.Context) {
	var confirmations []entity.Confirmation
	if err := entity.DB().Preload("Confirmation_Type").Preload("Disease").Preload("Patient").Raw("SELECT * FROM confirmations").Find(&confirmations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": confirmations})
}

// DELETE /confirmations/:id
func DeleteConfirmation(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM confirmations WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "confirmation not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /confirmations
func UpdateConfirmation(c *gin.Context) {
	var confirmation entity.Confirmation
	if err := c.ShouldBindJSON(&confirmation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", confirmation.ID).First(&confirmation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "confirmation not found"})
		return
	}

	if err := entity.DB().Save(&confirmation).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": confirmation})
}

func ListConfirmations_Bill(c *gin.Context) {
	var confirmations []entity.Confirmation
	if err := entity.DB().Preload("Employee").Preload("Confirmation_Type").Preload("Disease").Preload("Patient").Raw("SELECT * FROM (SELECT * FROM confirmations ORDER BY id DESC) AS x GROUP BY patient_id ").Find(&confirmations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": confirmations})
}

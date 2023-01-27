package controller

import (
	"github.com/sut65/team10/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /receives

func CreateReceive(c *gin.Context) {
	var receive entity.Receive
	var bill entity.Bill
	var detergent entity.Detergent
	var softener entity.Softener

	if err := c.ShouldBindJSON(&receive); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//8: ค้นหา bill ด้วยไอดี
	if tx := entity.DB().Where("id = ?", receive.Bill_ID).First(&bill); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type Game not found"})

		return

	}

	//9: ค้นหา Det ด้วยไอดี
	if tx := entity.DB().Where("id = ?", receive.Detergent_ID).First(&detergent); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type Game not found"})

		return

	}

	//10: ค้นหา Sof ด้วยไอดี
	if tx := entity.DB().Where("id = ?", receive.Softener_ID).First(&softener); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type Game not found"})

		return

	}

	//11: สร้าง
	rec := entity.Receive{
		Bill_ID:      receive.Bill_ID,
		Detergent_ID: receive.Detergent_ID,
		Softener_ID:  receive.Softener_ID,
		Det_Quantity: receive.Det_Quantity,
		Sof_Quantity: receive.Sof_Quantity,
		Time_Stamp:   bill.Time_Stamp.Local(),
	}

	//12: บันทึก
	if err := entity.DB().Create(&rec).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rec})

}

// GET /receive/:id

func GetReceive(c *gin.Context) {
	var receive entity.Receive
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM bills WHERE id = ?", id).Scan(&receive).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": receive})
}

// GET /receives

func ListReceives(c *gin.Context) {
	var receive entity.Receive
	if err := entity.DB().Raw("SELECT * FROM bills").Scan(&receive).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": receive})

}

// PATCH /receives

func UpdateReceive(c *gin.Context) {
	var receive entity.Receive
	if err := c.ShouldBindJSON(&receive); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", receive.ID).First(&receive); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if err := entity.DB().Save(&receive).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": receive})

}

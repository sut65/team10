package controller

import (
	"net/http"

	govalidator "github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// POST /receives

func CreateReceive(c *gin.Context) {
	var receive entity.Receive
	var bill entity.Bill
	var stock entity.Stock

	if err := c.ShouldBindJSON(&receive); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//8: ค้นหา bill ด้วยไอดี
	if tx := entity.DB().Where("id = ?", receive.Bill_ID).First(&bill); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type Game not found"})

		return

	}

	//10: ค้นหา Det ด้วยไอดี
	if tx := entity.DB().Where("id = ?", receive.Det_ID).First(&stock); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type Game not found"})

		return

	}

	//11: ค้นหา Sof ด้วยไอดี
	if tx := entity.DB().Where("id = ?", receive.Sof_ID).First(&stock); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type Game not found"})

		return

	}

	//12: สร้าง
	rec := entity.Receive{
		Bill_ID:    receive.Bill_ID,
		Det_ID:     receive.Det_ID,
		Sof_ID:     receive.Sof_ID,
		Time_Stamp: bill.Time_Stamp.Local(),
	}

	if _, err := govalidator.ValidateStruct(rec); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//13: บันทึก
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
package controller

import (
	"github.com/sut65/team10/entity"
	//"gopkg.in/yaml.v2"
	"net/http"

	govalidator "github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST /receives

func CreateReceive(c *gin.Context) {
	var receive entity.Receive
	var bill entity.Bill
	var detergent entity.Detergent
	var softener entity.Softener
	var employee entity.Employee

	if err := c.ShouldBindJSON(&receive); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา Employee ด้วยไอดี
	if tx := entity.DB().Where("id = ?", receive.Employee_ID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})

		return

	}

	//8: ค้นหา bill ด้วยไอดี
	if tx := entity.DB().Where("id = ?", receive.Bill_ID).First(&bill); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bill not found"})

		return

	}

	//9: ค้นหา Det ด้วยไอดี
	if tx := entity.DB().Where("id = ?", receive.Detergent_ID).First(&detergent); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Detergent not found"})

		return

	}

	//10: ค้นหา Sof ด้วยไอดี
	if tx := entity.DB().Where("id = ?", receive.Softener_ID).First(&softener); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Softener not found"})

		return

	}

	//11: สร้าง
	rec := entity.Receive{
		Employee_ID:  receive.Employee_ID,
		Bill_ID:      receive.Bill_ID,
		Detergent_ID: receive.Detergent_ID,
		Softener_ID:  receive.Softener_ID,
		Det_Quantity: receive.Det_Quantity,
		Sof_Quantity: receive.Sof_Quantity,
		Time_Stamp:   receive.Time_Stamp.Local(),
	}

	if _, err := govalidator.ValidateStruct(rec); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
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
	if err := entity.DB().Raw("SELECT * FROM receives WHERE id = ?", id).Scan(&receive).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": receive})
}

// GET /receives

func ListReceives(c *gin.Context) {
	var receive []entity.Receive
	if err := entity.DB().Preload("Bill").Preload("Detergent.Stock.Brand").Preload("Softener.Stock.Brand").Preload("Employee").Raw("SELECT * FROM receives").Find(&receive).Error; err != nil {
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

	var updateDet_Quantity = receive.Det_Quantity
	var updateSof_Quantity = receive.Sof_Quantity

	//12: สร้าง
	u_rec := entity.Receive{
		Model:        gorm.Model{ID: receive.ID},
		Det_Quantity: updateDet_Quantity,
		Sof_Quantity: updateSof_Quantity,
		Employee_ID:  receive.Employee_ID,
		Time_Stamp:   receive.Time_Stamp.Local(),
	}

	if err := entity.DB().Where("id = ?", receive.ID).Updates(&u_rec).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u_rec})

}

// DELETE /receives/:id
func DeleteReceive(c *gin.Context) {
	var receive entity.Receive

	if err := c.ShouldBindJSON(&receive); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Exec("DELETE FROM receives WHERE id = ?", receive.ID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "receive not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": receive})
}

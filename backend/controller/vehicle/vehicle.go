package controller

import (
	"net/http"

	govalidator "github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// POST /vehicles

func CreateVehicle(c *gin.Context) {
	var vehicle entity.Vehicle
	var brandvehicle entity.Brand_Vehicle
	var engine entity.Engine

	if err := c.ShouldBindJSON(&vehicle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//8: ค้นหา branvehicle ด้วยไอดี
	if tx := entity.DB().Where("id = ?", vehicle.Brand_Vehicle_ID).First(&brandvehicle); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type Game not found"})

		return

	}

	//9: ค้นหา engine ด้วยไอดี
	if tx := entity.DB().Where("id = ?", vehicle.Engine_ID).First(&engine); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type Game not found"})

		return

	}

	//10: สร้าง
	rec := entity.Vehicle{
		Brand_Vehicle_ID: vehicle.Brand_Vehicle_ID,
		Engine_ID:       vehicle.Engine_ID,
		ListModel:       vehicle.ListModel,
		Vehicle_Rigis:    vehicle.Vehicle_Rigis,
		Time_Insulance:  vehicle.Time_Insulance.Local(),
	}

	if _, err := govalidator.ValidateStruct(rec); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//11: บันทึก
	if err := entity.DB().Create(&rec).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rec})

}

// GET /vehicle/:id

func GetVehicle(c *gin.Context) {
	var vehicle entity.Vehicle
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM bills WHERE id = ?", id).Scan(&vehicle).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": vehicle})
}

// GET /receives

func ListVehicle(c *gin.Context) {
	var vehicle entity.Vehicle
	if err := entity.DB().Raw("SELECT * FROM bills").Scan(&vehicle).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": vehicle})

}

// PATCH /vehicles

func UpdateVehicle(c *gin.Context) {
	var vehicle entity.Vehicle
	if err := c.ShouldBindJSON(&vehicle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", vehicle.ID).First(&vehicle); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if err := entity.DB().Save(&vehicle).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": vehicle})

}

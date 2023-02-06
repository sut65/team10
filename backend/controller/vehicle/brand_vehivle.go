package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// POST /brandvehicles
func ListBrand_Vehicles(c *gin.Context) {
	var brand_vehicles []entity.Brand_Vehicle
	if err := entity.DB().Raw("SELECT * FROM brand_vehicles ").Scan(&brand_vehicles).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": brand_vehicles})

}

func GetBrand_Vehicle(c *gin.Context) {
	var brand_vehicle entity.Vehicle
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM brand_vehicles WHERE id = ?", id).Scan(&brand_vehicle).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": brand_vehicle})
}

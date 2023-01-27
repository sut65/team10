package controller

import (
	"github.com/sut65/team10/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /softener
func Createsofteners(c *gin.Context) {
	var softener entity.Detergent
	if err := c.ShouldBindJSON(&softener); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&softener).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": softener})
}

// GET /detergent/:id
func GetSoftener(c *gin.Context) {
	var softener entity.Detergent
	id := c.Param("weight_id")
	if err := entity.DB().Raw("SELECT * FROM weights WHERE weight_id = ?", id).Scan(&softener).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": softener})
}

// GET /users
func ListSofteners(c *gin.Context) {
	var softener []entity.Weight
	if err := entity.DB().Raw("SELECT * FROM weights").Scan(&softener).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": softener})
}

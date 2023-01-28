package controller

import (
	"github.com/sut65/team10/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET /softeners
func ListSofteners(c *gin.Context) {
	var softener []entity.Softener
	if err := entity.DB().Preload("Stock.Brand").Raw("SELECT * FROM softeners").Find(&softener).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": softener})
}

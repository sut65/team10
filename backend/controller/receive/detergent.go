package controller

import (
	"github.com/sut65/team10/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET /detergents
func ListDetergents(c *gin.Context) {
	var detergent []entity.Weight
	if err := entity.DB().Raw("SELECT * FROM detergents").Scan(&detergent).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": detergent})
}

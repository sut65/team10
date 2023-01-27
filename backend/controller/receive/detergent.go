package controller

import (
	"github.com/sut65/team10/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /detergents
func CreateDetergents(c *gin.Context) {
	var detergent entity.Detergent
	if err := c.ShouldBindJSON(&detergent); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&detergent).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": detergent})
}

// GET /detergent/:id
func GeteDetergent(c *gin.Context) {
	var detergent entity.Detergent
	id := c.Param("weight_id")
	if err := entity.DB().Raw("SELECT * FROM weights WHERE weight_id = ?", id).Scan(&detergent).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": detergent})
}

// GET /users
func ListDetergents(c *gin.Context) {
	var detergent []entity.Weight
	if err := entity.DB().Raw("SELECT * FROM weights").Scan(&detergent).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": detergent})
}

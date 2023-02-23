package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// GET /Position/:id //__nil fomat select ผิด
func ListPosition(c *gin.Context) {
	var position []entity.Position
	if err := entity.DB().Raw("SELECT * FROM positions").Scan(&position).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": position})
}

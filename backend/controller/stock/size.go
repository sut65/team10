package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// GET
func ListSizes(c *gin.Context) {

	var size []entity.Size

	if err := entity.DB().Raw("SELECT * FROM Sizes ").Scan(&size).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": size})

}

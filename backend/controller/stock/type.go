package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// GET
func ListTypes(c *gin.Context) {

	var types []entity.Type

	if err := entity.DB().Raw("SELECT * FROM types ").Scan(&types).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": types})

}

package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// GET
func ListBrands(c *gin.Context) {

	var brand []entity.Brand

	if err := entity.DB().Raw("SELECT * FROM Brands ").Scan(&brand).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": brand})

}

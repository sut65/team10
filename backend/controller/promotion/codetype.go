package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// POST /users
func ListCodetypes(c *gin.Context) {
	var Codetype []entity.Codetype
	if err := entity.DB().Raw("SELECT * FROM codetypes").Scan(&Codetype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Codetype})

}

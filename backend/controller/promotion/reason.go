package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// POST /users
func ListReasons(c *gin.Context) {
	var Reason []entity.Reason
	if err := entity.DB().Raw("SELECT * FROM reasons").Scan(&Reason).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Reason})

}

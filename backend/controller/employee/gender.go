package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// GET 
func ListGenders(c *gin.Context) {

	var gender []entity.Gender

	if err := entity.DB().Raw("SELECT * FROM Genders ").Scan(&gender).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": gender})
//ล่าสุด

}

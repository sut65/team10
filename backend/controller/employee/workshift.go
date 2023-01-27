package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// GET /Workshift/:id //last ver
func ListWorkShift(c *gin.Context) {
	var workshift []entity.WorkShift
	if err := entity.DB().Raw("SELECT * FROM work_shifts").Scan(&workshift).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": workshift})
}

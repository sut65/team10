package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// POST /engines
func ListEngines(c *gin.Context) {
	var engine entity.Engine
	if err := entity.DB().Raw("SELECT * FROM reasons").Scan(&engine).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": engine})

}

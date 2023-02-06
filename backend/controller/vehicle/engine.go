package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team10/entity"
)

// POST /engines
func ListEngines(c *gin.Context) {
	var engines []entity.Engine
	if err := entity.DB().Raw("SELECT * FROM engines").Scan(&engines).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": engines})

}
func GetEngine(c *gin.Context) {
	var engine entity.Vehicle
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM engines WHERE id = ?", id).Scan(&engine).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": engine})
}

package controller

import (

             "github.com/sut65/team10/entity"
           "github.com/gin-gonic/gin"
           "net/http"

)


// GET /officer/:id
func GetSatisfaction(c *gin.Context) {

	var satisfaction entity.Satisfaction

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM satisfactions WHERE id = ?", id).Scan(&satisfaction).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": satisfaction})
}

// GET /officers
func ListSatisfactions(c *gin.Context) {

	var satisfaction []entity.Satisfaction

	if err := entity.DB().Raw("SELECT * FROM satisfactions").Scan(&satisfaction).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": satisfaction})
}
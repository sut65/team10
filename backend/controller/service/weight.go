package controller

import (

	"github.com/sut65/team10/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

//POST /users
func CreateWeights(c *gin.Context) {
	var weight entity.Weight
	if err := c.ShouldBindJSON(&weight); err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}
	if err := entity.DB().Create(&weight).Error; err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}
	c.JSON(http.StatusOK, gin.H{"data": weight})
}

// GET /user/:id
func GetWeight(c *gin.Context) {
	var user entity.Weight
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM weights WHERE id = ?", id).Scan(&user).Error; err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}
	c.JSON(http.StatusOK, gin.H{"data": user})
}

// GET /users
func ListWeights(c *gin.Context) {
	var weight []entity.Weight
	if err := entity.DB().Raw("SELECT * FROM weights").Scan(&weight).Error; err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}
	c.JSON(http.StatusOK, gin.H{"data": weight})
}
package controller

import (

	"github.com/sut65/team10/entity"

	"github.com/gin-gonic/gin"

	"net/http"

)
//POST /users
func CreateTypeWashings(c *gin.Context) {
	var types entity.TypeWashing
	if err := c.ShouldBindJSON(&types); err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}
	if err := entity.DB().Create(&types).Error; err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}
	c.JSON(http.StatusOK, gin.H{"data": types})
}

// GET /user/:id
func GetTypeWashing(c *gin.Context) {
	var user entity.TypeWashing
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM type_washings WHERE id = ?", id).Scan(&user).Error; err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}
	c.JSON(http.StatusOK, gin.H{"data": user})
}

// GET /users
func ListTypeWashings(c *gin.Context) {
	var types []entity.TypeWashing
	if err := entity.DB().Raw("SELECT * FROM type_washings").Scan(&types).Error; err != nil {
		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		   return
	}
	c.JSON(http.StatusOK, gin.H{"data": types})
}
package controller

import (

	"github.com/sut65/team10/entity"
	"github.com/gin-gonic/gin"
    "net/http"

)

// POST /users
func CreateFormType(c *gin.Context) {

	var formtype entity.FormType

	if err := c.ShouldBindJSON(&formtype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&formtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": formtype})
}

// GET /officer/:id
func GetFormType(c *gin.Context) {

	var formtype entity.FormType

	id := c.Param("form_type_id")

	if err := entity.DB().Raw("SELECT * FROM formtypes WHERE form_type_id = ?", id).Scan(&formtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": formtype})
}

// GET /officers
func ListFormTypes(c *gin.Context) {

	var formtype []entity.FormType

	if err := entity.DB().Raw("SELECT * FROM formtypes").Scan(&formtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": formtype})
}